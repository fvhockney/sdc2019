const express = require( 'express' )
const path = require( 'path' )
const app = express()
const server = require( 'http' ).createServer( app )
const io = require( 'socket.io' )( server )

const PORT = 8082

app.use( express.static( path.resolve( __dirname, '..', 'public' )  ) )

app.get( '/', ( req, res ) => {
	res.sendFile( path.resolve( __dirname, '..', 'public/index.html' ) )
} )

// API
app.post( 'stop-project', ( req, res ) => {
	io.emit( 'stopProject', req )
	res.send('success')
} )

app.post( 'start-project', ( req, res ) => {
	io.emit( 'startProject', req )
	res.send('success')
} )

app.post( 'add-project', ( req, res ) => {
	console.log( req )
	io.emit( 'addProject', req )
	res.send('success')
} )

io.on( 'connection', socket => {
	console.log( 'new connection to server' )
} )

server.listen( PORT, () => { console.log('running') } )

