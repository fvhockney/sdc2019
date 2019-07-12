<template>
	<b-table
		striped
		:items="projects"
		>
		<template
			#duration="data"
			>
			<DurationSlot :data=data />
		</template>
		<template
			#started="data"
			>
			<b-button
				:variant="variant(data.value)"
				@click="$emit('toggleActive', data.index)"
				>
				{{ message(data.value) }}
			</b-button>
		</template>
	</b-table>
</template>
<script>
import DurationSlot from 'Components/DurationSlot.vue'

export default {
	name:    'ProjectsTable',
	components: {
		DurationSlot,
	},
	filters: {},
	props: {
		projects: {
			type:     Array,
			required: true,
		},
	},
	data () {
		return {
			fields: [
				{
					key:  'id',
					name: 'ID'
				},
				{
					key:  'name',
					name: 'Project'
				},
				{
					key: 'duration',
					name: 'Duration',
				},
				'started',
			],
		}
	},
	computed: {
	},
	watch: {},
	created: function () {},
	methods: {
		variant: function ( value ) {
			return value ? 'danger' : 'success'
		},
		message: function ( value ) {
			return value ? 'Stop' : 'Start'
		},
	},
}
</script>
<style scoped lang="scss">
</style>
