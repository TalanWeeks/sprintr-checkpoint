<template>
  <div class="Project">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          test
          {{ project.name }}
        </div>
        <div class="col-4">
          test
          {{ project.description }}
        </div>
        <div class="col-4">
          test
          {{ project.createdAt }}
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
