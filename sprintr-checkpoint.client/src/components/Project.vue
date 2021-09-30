<template>
  <div class="Project">
    <div class="container-fluid">
      <div class="row d-flex justify-content-around shadow rounded mt-2 mb-5 py-3 bg-dark text-light">
        <div class="col-3 selectable">
          <router-link :to="{name: 'Project', params: {id: project.id}}" class="selectable">
            <h4>
              Project Title:
            </h4>
            <span class="text-success">{{ project.name }}</span>
          </router-link>
        </div>
        <div class="col-3">
          <h4>
            Project Description:
          </h4>

          <span class="text-success">{{ project.description }}</span>
        </div>
        <div class="col-4">
          <h4>Project Start Date:</h4>

          <span class="text-success">{{ new Date(project.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="col-2 text-start">
          <div class="on-hover m-0 p-2">
            <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteProject(project.id)" v-if="account.id == project.creatorId"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectsService } from '../services/ProjectsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { Project } from '../models/Project'

export default {
  props: {
    project: { type: Project, required: true }
  },
  setup(props) {
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      async getProjects(props) {
        try {
          await projectsService.getProjects()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteProject(projectId) {
        try {
          await projectsService.deleteProject(projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
