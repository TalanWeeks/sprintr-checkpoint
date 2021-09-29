<template>
  <div class="Backlog">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-dark text-light">
        <div class="col-4">
          <h4>
            Backlog Title:
          </h4>
          <span class="text-success">{{ backlogItems.name }}</span>
        </div>
        <div class="col-4">
          <h4>
            Backlog Description:
          </h4>

          <span class="text-success">{{ backlogItems.description }}</span>
        </div>
        <div class="col-4">
          <h4>Backlog Start Date:</h4>

          <span class="text-success">{{ backlogItems.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: { type: Object, required: true }
  },
  setup() {
    return {
      backlogItems: () => AppState.backlogItems
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
