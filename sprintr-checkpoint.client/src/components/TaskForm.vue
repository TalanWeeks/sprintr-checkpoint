<template>
  <form @submit.prevent="createTask()">
    <div class="form-group">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="Task Name"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="weight"></label>
      <input v-model="editable.weight"
             type="number"
             name="weight"
             id="weight"
             placeholder="Weight"
             class="form-control"
      >
    </div>
    <!-- <div class="form-group">
      <label for="assignedTo"></label>
      <input v-model="editable.assignedTo"
             type="text"
             name="assignedTo"
             id="assignedTo"
             placeholder="Assigned To"
             class="form-control"
      >
    </div> -->
    <!-- NOTE need isComplete checkbox here probably -->
    <div class="btn-group">
      <button type="submit" class="btn btn-success selectable mt-4">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { BacklogItem } from '../models/BacklogItem.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { tasksService } from '../services/TaskService.js'
export default {
  props: {
    backlogItem: { type: BacklogItem, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,

      async createTask() {
        try {
          editable.value.backlogItemId = props.backlogItem.id
          await tasksService.createTask(editable.value, route.params.id)
          editable.value = {}
          Pop.toast('Task Created!', 'success')
          const modal = Modal.getInstance(document.getElementById(`task-form-${props.backlogItem.id}`))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
