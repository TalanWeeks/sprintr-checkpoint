<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <button v-if="user.isAuthenticated" class="btn btn-success my-5" type="button" data-bs-toggle="modal" data-bs-target="#project-form">
          Create Project
        </button>
      </div>
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

import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      // NOTE add on mounted to get all projects on page load
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
