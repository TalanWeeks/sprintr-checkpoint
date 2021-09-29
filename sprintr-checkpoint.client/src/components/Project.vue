<template>
  <div class="Project">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-dark text-light">
        <div class="col-4 selectable">
          <router-link :to="{name: 'Project', params: {id: project.id}}" class="selectable">
            <h4>
              Project Title:
            </h4>
            <span class="text-success">{{ project.name }}</span>
          </router-link>
        </div>
        <div class="col-4">
          <h4>
            Project Description:
          </h4>

          <span class="text-success">{{ project.description }}</span>
        </div>
        <div class="col-4">
          <h4>Project Start Date:</h4>

          <span class="text-success">{{ project.createdAt }}</span>
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
      async getProjects(props) {
        try {
          await projectsService.getProjects()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteProject() {
        try {
          await projectsService.deleteProject()
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
