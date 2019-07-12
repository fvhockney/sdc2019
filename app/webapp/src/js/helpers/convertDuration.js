export const convertDuration = function ( ms, format ) {
	let hours = 0,
			minutes = 0

	let seconds = Math.floor(ms / 1000)

	const has = {
		hours:   null !== format.match( /H{1,2}/i ) || false,
		minutes: null !== format.match( /M{1,2}/i ) || false,
		seconds: null !== format.match( /S{1,2}/i ) || false,
	}

	if ( true === has.hours ) {
		hours   = Math.floor( seconds / 3600 )
		seconds = seconds % 3600
	}
	if ( true === has.minutes ) {
		minutes = Math.floor( seconds / 60 )
		seconds = seconds % 60
	}

	format = format.replace( /HH/, hours.toString().replace( /^([0-9])$/, '0$1' ) )
	format = format.replace( /H/,  hours )

	format = format.replace( /MM/, minutes.toString().replace( /^([0-9])$/, '0$1' ) )
	format = format.replace( /M/,  minutes )

	format = format.replace( /SS/, seconds.toString().replace( /^([0-9])$/, '0$1' ) )
	format = format.replace( /S/,  seconds )

	return format
}
