<template>
  <div>
    <div v-if="currentProject">
      <p><b>Project Name:</b>{{ currentProject.name }} </p>
      <p><b>Project Description:</b>{{ currentProject.description }}</p>
    </div>
    <div v-else>
      ....loading....
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService.js'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      await projectsService.getProjectById(route.params.projectId)
    })
    return {
      currentProject: computed(() => AppState.currentProject)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
