<template>
  <form @submit.prevent="createSprint()">
    <div class="form-group">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="Project Name"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input v-model="editable.description"
             type="text"
             name="description"
             id="description"
             placeholder="Project Description"
             class="form-control"
      >
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-success selectable">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { sprintsService } from '../services/SprintsService.js'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createSpring() {
        try {
          await sprintsService.createSprint(editable.value)
          editable.value = {}
          Pop.toast('Sprint Created!', 'success')
          const modal = Modal.getInstance(document.getElementById('sprint-form'))
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
