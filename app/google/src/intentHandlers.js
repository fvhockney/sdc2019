const {
    dialogflow,
    actionssdk,
} = require( 'actions-on-google' )

import { config } from './config.js'
import api from './api.js'

const app = dialogflow( {
    debug: true,
    verification: {
        authorization: config.auth
    }
} )

app.intent( 'addProject', async ( conv, params ) => {
    resp = await api.add( params.project )
} )
app.intent( 'startProject', ( conv, params ) => {
    resp = await api.start( params.project )
} )
app.intent( 'stopProject', ( conv, params ) => {
    resp = await api.stop( params.project )
} )

export { app }
