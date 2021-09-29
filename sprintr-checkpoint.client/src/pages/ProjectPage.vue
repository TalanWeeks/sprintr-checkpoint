<template>
  <div>
    <div v-if="currentProject.length>0">
      <p><b>Project Name:</b>{{ currentProject.name }} </p>
      <p><b>Project Description:</b>{{ currentProject.description }}</p>
    </div>
    <div v-else>
      ....loading....
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    // watchEffect(async() => {
    //   await projectsService.getProjects(route.params.id)
    // })
    return {
      currentProject: computed(() => AppState.currentProject)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
