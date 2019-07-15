require('regenerator-runtime/runtime')
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const app = require( '../lib/intentHandler' ).handler

// Server
const server = express().use(bodyParser.json())
const PORT = 8083
const HOST = '0.0.0.0'
server.listen(PORT, HOST)
console.log( "running" )
server.post('/', ( req, res )=> {
    app.invoke( req.body )
        .then( responseBody => res.json( responseBody ) ) 
        .catch( err => console.error( err ) )
} )
