<template>
  <div class="component">
    <div class="col-12 d-flex">
      <img :src="task.creator.picture" alt="" height="50">
      <p><b>{{ task.creator.name }}: </b>{{ task.name }}   </p>
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <div>
      <p><b>Weight:</b> {{ task.weight }}</p>
    </div>
    <form>
      <label :for="'checked-' + task.id">Completed?</label>
      <input type="checkbox" :checked="task.isComplete" :id="'checked-' + task.id" :name="'checked-' + task.id" @click="toggleChecked(task.id)">
    </form>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { Task } from '../models/Task.js'
import { tasksService } from '../services/TaskService.js'
export default {
  props: {
    task: { type: Task, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      async toggleChecked(taskId) {
        await tasksService.toggleChecked(taskId, route.params.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
