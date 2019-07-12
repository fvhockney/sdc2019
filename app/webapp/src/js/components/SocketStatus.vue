<template>
	<div>
		Socket Status:
		<b-badge
			:variant="socketStatus"
			>
			{{ socketMsg }}
		</b-badge>
	</div>
</template>
<script>
import { SocketStatus, SocketData } from 'Mixins/Socket'

export default {
	name:    'SocketStatus',
	mixins:  [ SocketData ],
	sockets: {
		...SocketStatus,
	},
}
</script>
<style scoped lang="scss">
</style>
