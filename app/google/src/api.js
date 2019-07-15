import axios from 'axios'
import { config } from './config'

class Api {
    constructor () {
        this.instance = axios.create( {
            baseURL: config.apiendpoint
        } )
    }

    stop ( project ) {
        return this.instance.post( 'projects/stop', { project } )
    }

    start ( project ) {
        return this.instance.post( 'projects/start', { project } )
    }

    add ( project ) {
        return this.instance.post( 'projects/add', { name: project } )
    }
}

const api = new Api()

export default api
