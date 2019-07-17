<template>
	<div>
		{{ time | convertDuration( 'HH:MM:SS' ) }}
	</div>
</template>
<script>
import { convertDuration } from 'Helpers/convertDuration'

export default {
	name:    'DurationSlot',
	filters: {
		convertDuration,
	},
	props: [ 'data' ],
	data () {
		return {
			time:      0,
			timeoutId: null,
		}
	},
	watch: {
		data: {
			handler: function () {
				if ( !this.data.item.started ) {
					clearInterval( this.timeoutId )
				} else {
					this.totalDuration()
				}
			},
			deep: true,
		},
	},
	created: function () {
		this.time = this.data.value
		//this.totalDuration()
		//clearInterval( this.timeoutId )
	},
	methods: {
		totalDuration: function () {
				const started = Date.now()
			this.timeoutId = setInterval( () => {
				let offset = 0
				if ( this.data.item.started ) {
					offset = Math.abs( Date.now() - started )
				}
				this.time = this.data.value + offset
			}, 2000 )
		},
	},
}
</script>
<style scoped lang="scss">
</style>
