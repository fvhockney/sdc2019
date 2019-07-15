import { dialogflow, actionssdk, Suggestions } from 'actions-on-google'

class Response {
    constructor ( conv ) {
        this.conv = conv
    }

    speak( text ) {
        this.conv.close( text )
    }
}

export default Response
