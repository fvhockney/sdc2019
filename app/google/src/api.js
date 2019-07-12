import axios from 'axios'

class Api {
    constructor () {
        this.instance = axios.create( {
            baseURL: 'https://sdctimetracker.verns.space'
        } )
    }

    stop ( project ) {
        return this.instance.post( 'stop-project', { project } )
    }

    start ( project ) {
        return this.instance.post( 'start-project', { project } )
    }

    add ( project ) {
        return this.instance.post( 'add-project', { project } )
    }
}

const api = new Api()

export default api
