const {
    dialogflow,
    actionssdk,
} = require( 'actions-on-google' )

import { config } from './config.js'
import api from './api.js'
import Response from './responses'

const app = dialogflow( {
    debug: true,
    verification: {
        authorization: config.auth
    }
} )


app.intent( 'addProject', async ( conv, params ) => {
    const response = new Response( conv )
    try {
        const resp = await api.add( params.project )
        response
            .speak( `Ok. I added the project ${resp.data.data.name}.` )
    } catch ( err ) {
        response
            .speak( `Sorry. I couldn't add project ${params.project}.` )
    }
} )
app.intent( 'startProject', async ( conv, params ) => {
    const response = new Response( conv )
    try {
        const resp = await api.start( params.project )
        response
            .speak( `Ok. I started the project ${resp.data.data.name}.` )
    } catch ( err ) {
        response
            .speak( `Sorry. I couldn't start project ${params.project}.` )
    }
} )
app.intent( 'stopProject', async ( conv, params ) => {
    const response = new Response( conv )
    try {
        const resp = await api.stop( params.project )
        response
            .speak( `Ok. I stopped he project ${resp.data.data.name}.` )
    } catch ( err ) {
        response
            .speak( `Sorry. I couldn't stop project ${params.project}.` )
    }
} )

export { app }
