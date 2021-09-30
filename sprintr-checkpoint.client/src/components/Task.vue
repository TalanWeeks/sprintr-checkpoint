<template>
  <div class="component">
    <div class="col-12 d-flex">
      <img :src="task.creator.picture" alt="" height="50">
      <p><b>{{ task.creator.name }}: </b>{{ task.name }}</p>
    </div>
  </div>
</template>

<script>
import { Task } from '../models/Task.js'
export default {
  props: {
    task: { type: Task, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
