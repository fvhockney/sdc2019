import Vue from 'vue'

import './assets/scss/custom.scss'
import BootstrapVue from 'bootstrap-vue'

import Home from 'Views/Home.vue'

import VSock from 'vue-socket.io'

const Socket = new VSock( {
	debug: true,
	connection: 'http://sdctimetracker.verns.space',
	options: { reconnectionAttempts: 2 }
} )

Vue.use( BootstrapVue )
Vue.use( Socket )

window.onload = () => new Vue( {
	render( h ) { return h( Home ) }
} ).$mount( '#app' )
