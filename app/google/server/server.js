require('regenerator-runtime/runtime')
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const app = require( './lib/intentHandlers' ).app

// Server
const server = express().use(bodyParser.json())
const PORT = 8081
const HOST = '0.0.0.0'
server.listen(PORT, HOST)
console.log( "running" )
server.post('/', app) 
