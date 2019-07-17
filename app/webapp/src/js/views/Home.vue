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
import axios from 'axios'

const api = axios.create( { baseURL: 'https://sdctimetracker.verns.space' } )

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
			projects:       [],
		}
	},
	created: async function () {
		const { data } = await api.post( 'projects' )
		this.projects = data
	},
	sockets: {
		addNewProject: function ( data ) {
			this.projects.splice( this.projects.length, 0, data )
		},
		startProject: function ( data ) {
			const item = this.projects.find( pr => pr.id === Number( data.id ) )
			item.started = data.started
		},
		stopProject: function ( data ) {
			const item = this.projects.find( pr => pr.id === Number( data.id ) )
			item.duration = data.duration
			item.started = data.started
		},
		removeProject: function ( data ) {
			this.projects.splice( data - 1, 1 )
		},
	},
	methods: {
		toggleActive: function ( index ) {
			const item = this.projects[ index ]
			item.started ?  this.updateDuration( item ) : this.setStarted( item )
		},
		updateDuration: function ( item ) {
			api.post( 'projects/stop', {
				project:  item.id,
				duration: item.duration,
				started:  item.started,
			} )
		},
		setStarted: function ( item ) {
			api.post( 'projects/start', {
				project: item.id,
			} )
		},
		addProject: function () {
			api.post( 'projects/add', {
				name: this.newProjectName,
			} )
		},
	},
}
</script>
<style scoped lang="scss">
</style>
