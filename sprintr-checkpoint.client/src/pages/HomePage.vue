<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <button v-if="user.isAuthenticated" class="btn btn-success my-5 ms-3" type="button" data-bs-toggle="modal" data-bs-target="#project-form">
          Create Project
        </button>
      </div>
      <Project v-for="p in projects" :key="p.id" :project="p" />
    </div>

    <Modal id="project-form">
      <template #modal-title>
        Add your project
      </template>
      <template #modal-body>
        <ProjectsForm />
      </template>
    </Modal>
  </div>
</template>

<script>

import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      // NOTE add on mounted to get all projects on page load
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
