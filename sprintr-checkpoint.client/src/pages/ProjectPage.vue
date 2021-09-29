<template>
  <div>
    <div v-if="currentProject">
      <div class="container-fluid">
        <div class="row custom-row">
          <div class="col-md-2 d-flex flex-md-column bg-dark">
            <ul class="nav-links ps-5 pt-5">
              <li class="nav-link">
                <router-link class="selectable rounded p-2 text-success " :to="{name: 'About'}">
                  <h5>Backlog</h5>
                </router-link>
              </li>
              <li class="nav-link">
                <router-link class="selectable rounded p-2 text-success " :to="{name: 'About'}">
                  <h5>Sprint</h5>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-10">
            <div class="row shadow rounded m-3 py-3 bg-dark text-light">
              <div class="col-4">
                <h4>
                  Project Title:
                </h4>
                <span class="text-success">{{ currentProject.name }}</span>
              </div>
              <div class="col-4">
                <h4>
                  Project Description:
                </h4>

                <span class="text-success">{{ currentProject.description }}</span>
              </div>
              <div class="col-4">
                <h4>Project Start Date:</h4>

                <span class="text-success">{{ currentProject.createdAt }}</span>
              </div>
            </div>
            <div class="row">
              <router-view />
            </div>
          </div>
        </div>
      </div>
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

.custom-row{
  height: 100vh;
}

</style>
