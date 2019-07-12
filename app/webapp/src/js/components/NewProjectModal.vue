<template>
	<b-modal
		id="add-modal"
		title="Add new Project"
		@ok="$emit('addProject')"
		>
		<b-form-input
			placeholder="Project Name"
			@input="$emit('update:new-project-name', $event)"
			@keydown.enter="handleEnter"
			/>
	</b-modal>
</template>
<script>
export default {
	name:  'NewProjectModal',
	props: {
		newProjectName: {
			type:     String,
			required: true,
		},
	},
	data () {
		return {}
	},
	methods: {
		handleEnter: function () {
			this.$emit( 'addProject' )
			this.$bvModal.hide( 'add-modal' )
		},
	},
}
</script>
<style scoped lang="scss">
</style>
