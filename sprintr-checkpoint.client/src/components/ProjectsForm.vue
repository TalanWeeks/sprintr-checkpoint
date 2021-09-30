<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="Project Name"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input v-model="editable.description"
             type="text"
             name="description"
             id="description"
             placeholder="Project Description"
             class="form-control"
      >
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-success selectable mt-4">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { Modal } from 'bootstrap'

import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      currentProjectId: computed(() => AppState.currentProject.id),

      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          editable.value = {}
          Pop.toast('Project Created!', 'success')
          const modal = Modal.getInstance(document.getElementById('project-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
