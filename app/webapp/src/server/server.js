import express from 'express'
import { createServer } from 'http'
import path from 'path'
import sqlite from 'sqlite'
import bodyparser from 'body-parser'

const app = express()
const server = createServer( app )
const io = require( 'socket.io' )( server )

const PORT = 8082
const dbPromise = Promise.resolve()
	.then( () => sqlite.open( './database.sqlite' ) )
	.then( db => db.migrate( { force: 'last' } ) )
	.catch( err => console.error( err ) )

const testdb = async () => {
	const db = await dbPromise
	const res = await db.all( 'SELECT * FROM Projects;' )
	console.info( res )
}

testdb()

app.use( bodyparser.json() )
app.use( bodyparser.urlencoded( { extended: true } ) )
app.use( express.static( path.resolve( __dirname, 'public' )  ) )

app.get( '/', ( req, res ) => {
	res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
} )

// API
app.post( '/projects', async ( req, res ) => {
	const db = await dbPromise
	const data = await db.all( 'SELECT * FROM Projects;' )
	res.json( data )
} )

app.post( '/projects/stop', async ( req, res ) => {
	let project = req.body.project
	let duration = req.body.duration
	let started = req.body.started
	let data
	const db = await dbPromise
	if ( isNaN( project ) ) {
		try {
			let id;
			( { id, duration, started } = await db.get( 'SELECT * FROM Projects where name = ?;', project ) )
			project = id
		} catch ( err ) {
			res.status( 500 ).end()
		}
	}
	if ( !project ) {
		res.json( { error: 'no project' } )
	} else {
		try {
			duration += ( Date.now() - started )
			await db.get( 'UPDATE Projects SET started = NULL, duration = $duration WHERE id = $id;', {
				$id:       project,
				$duration: duration,
			} )
			data = await db.get( 'SELECT * FROM Projects where id = ?;', project )
			io.emit( 'stopProject', data )
			res.json( { data } )
		} catch ( err ) {
			res.status( 500 ).end()
		}
	}
} )

app.post( '/projects/start', async ( req, res ) => {
	let project = req.body.project
	let data
	const db = await dbPromise
	const started = Date.now()
	if ( isNaN( project ) ) {
		try {
			const row = await db.get( 'SELECT * FROM Projects where name = ?;', project )
			project = row.id
		} catch ( err ) {
			res.status( 500 ).end()
		}
	}
	if ( !project ) {
		res.json( { error: 'no project' } )
	} else {
		try {
			await db.get( 'UPDATE Projects SET started = $started WHERE id = $id;', {
				$id:      project,
				$started: started,
			} )
			data = await db.get( 'SELECT * FROM Projects where id = ?;', project )
			io.emit( 'startProject', data )
			res.json( { data } )
		} catch ( err ) {
			res.status( 500 ).end()
		}
	}
} )

app.post( '/projects/add', async ( req, res ) => {
	try {
		const db = await dbPromise
		await db.get( 'INSERT INTO Projects (name) VALUES (?);', req.body.name )
		const data = await db.get( 'SELECT * FROM Projects where name = ?;', req.body.name )
		io.emit( 'addNewProject', data )
		res.json( { data } )
	} catch ( err ) {
		res.status( 500 ).end()
	}
} )

io.on( 'connection', socket => {
	console.log( 'new connection to server' )
} )


server.listen( PORT, () => { console.log('running') } )

