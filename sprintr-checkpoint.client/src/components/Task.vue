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
    <div v-if="account.id === task.creatorId">
      <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteTask(task.id)"></i>
    </div>
    <form>
      <label :for="'checked-' + task.id">Completed:</label>
      <input type="checkbox" :checked="task.isComplete" :id="'checked-' + task.id" :name="'checked-' + task.id" @click="toggleChecked(task.id)">
    </form>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Task } from '../models/Task.js'
import { tasksService } from '../services/TaskService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    task: { type: Task, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async toggleChecked(taskId) {
        await tasksService.toggleChecked(taskId, route.params.id)
      },
      async deleteTask(taskId) {
        try {
          await tasksService.deleteTask(taskId, route.params.id)
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
