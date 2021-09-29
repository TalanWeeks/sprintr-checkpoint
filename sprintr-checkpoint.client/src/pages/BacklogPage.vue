<template>
  <div v-if="backlogItems">
    <div class="row text-center text-dark my-2">
      <div class="col-5"></div>
      <div class="col-2 text-center border-dark border-bottom ">
        <h2>
          BackLogs
        </h2>
      </div>
      <div class="col-5"></div>
    </div>
    <div class="container">
      <BacklogItem v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
    </div>
  </div>
  <div v-else>
    ...loading....
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { backlogItemsService } from '../services/BacklogItemsService.js'
export default {
  setup() {
    const currentProject = computed(() => AppState.currentProject)
    onMounted(async() => {
      try {
        await backlogItemsService.getBacklogItems(currentProject.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      backlogItems: computed(() => AppState.backlogItems)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
