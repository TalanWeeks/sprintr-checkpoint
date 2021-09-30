<template>
  <div class="Sprint">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-dark text-light">
        <div class="col-5">
          <h4>
            Sprint Title:
          </h4>
          <span class="text-success">{{ sprint.name }}</span>
        </div>
        <div class="col-5">
          <h4>
            Sprint Created:
          </h4>
          <span class="text-success">{{ new Date(sprint.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="col-2">
          <div class="on-hover m-0 p-2">
            <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteSprint(sprint.id)" v-if="account.id == sprint.creatorId"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(route.params.id, sprintId)
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
