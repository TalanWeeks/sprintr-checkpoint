<template>
  <div v-if="sprints">
    <div class="row text-center text-dark my-2">
      <div class="col-5"></div>
      <div class="col-2 text-center my-4 border-dark border-bottom">
        <h2>
          Sprints
        </h2>
      </div>
      <div class="col-5"></div>
    </div>
    <div class="container">
      <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
    </div>
  </div>
  <div v-else>
    ......loading.....
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { sprintsService } from '../services/SprintsService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
