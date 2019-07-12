<template>
	<div>
		<ProjectsTable
			:projects="projects"
			@toggleActive="toggleActive"
			/>
		<b-button
			v-b-modal.add-modal
			variant="primary"
			>
			New Project
		</b-button>
		<SocketStatus />
		<NewProjectModal
			:new-project-name.sync="newProjectName"
			@hidden="newProjectname = ''"
			@addProject="addProject"
			/>
	</div>
</template>
<script>
import NewProjectModal from 'Components/NewProjectModal.vue'
import ProjectsTable from 'Components/ProjectsTable.vue'
import SocketStatus from 'Components/SocketStatus.vue'

export default {
	name:       'Home',
	components: {
		NewProjectModal,
		ProjectsTable,
		SocketStatus,
	},
	data () {
		return {
			newProjectName: '',
			projects: [
				{ id: 1, name: 'test', duration: 2045, started: null },
				{ id: 2, name: 'test2', duration: 45, started: Date.now() },
			]
		}
	},
	sockets: {
		addNewProject: function ( data ) {
			this.newProjectName = data
			this.addProject()
			this.newProjectName = ''
		},
		startProject: function ( data ) {
			const item = this.projects.find( pr => pr.id === Number( data ) )
			this.setStarted( item )
		},
		stopProject: function ( data ) {
			const item = this.projects.find( pr => pr.id === Number( data ) )
			this.updateDuration( item )
		},
		removeProject: function ( data ) {
			this.projects.splice( data - 1, 1 )
		},
		activeProject: function () {
			const items = this.projects.filter( pr => pr.started )
			const data = items.map( it => {  return { id: it.id, name: it.name } } )
			console.log( data )
		},
	},
	methods: {
		toggleActive: function ( index ) {
			const item = this.projects[ index ]
			console.log(item)
			item.started ?  this.updateDuration( item ) : this.setStarted( item )
		},
		updateDuration: function ( item ) {
			item.duration += Date.now() - item.started
			item.started = null
		},
		setStarted: function ( item ) {
			item.started = Date.now()
		},
		addProject: function () {
			this.projects.splice( this.projects.length, 0, {
				id:       this.projects.length + 1,
				name:     this.newProjectName,
				duration: 0,
				started:  null,
			} )
		},
	},
}
</script>
<style scoped lang="scss">
</style>
