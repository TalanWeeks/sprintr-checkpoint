<template>
  <div class="Backlog">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-dark text-light">
        <div class="col-4">
          <h4>
            Backlog Title:
          </h4>
          <span class="text-success">{{ backlogItem.name }}</span>
        </div>
        <div class="col-4">
          <h4>
            Backlog Description:
          </h4>

          <span class="text-success">{{ backlogItem.description }}</span>
        </div>
        <div class="col-4">
          <h4>Backlog Status:</h4>

          <span class="text-success">{{ backlogItem.status }}</span>
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
  setup(props) {
    return {
      backlogItems: () => AppState.backlogItems
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
