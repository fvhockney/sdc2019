export const SocketStatus = {
	connect: function () {
		this.socketMsg = 'Connected'
		this.socketStatus = 'success'
	},
	connect_timeout: function () {
		this.socketMsg = 'Connection Timeout'
		this.socketStatus = 'danger'
	},
	connect_error: function () {
		this.socketMsg = 'Connection Error'
		this.socketStatus = 'danger'
	},
	reconnecting: function () {
		this.socketMsg = 'Reconnecting'
		this.socketStatus = 'warning'
	},
	reconnect_error: function () {
		this.socketMsg = 'Reconnection Error'
		this.socketStatus = 'danger'
	},
	reconnect_failed: function () {
		this.socketMsg = 'All Reconnection Attempts Failed'
		this.socketStatus = 'danger'
	},
	reconnect: function () {
		this.socketMsg = 'Connected'
		this.socketStatus = 'success'
	},
}

export const SocketData = {
	data: function () {
		return {
			socketMsg:    'No Socket',
			socketStatus: 'warning',
		}
	},
}
