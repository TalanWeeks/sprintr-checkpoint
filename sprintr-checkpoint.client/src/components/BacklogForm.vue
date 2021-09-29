<template>
  <form @submit.prevent="createBacklogItem()">
    <div class="form-group">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="Item Name"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input v-model="editable.description"
             type="text"
             name="description"
             id="description"
             placeholder="Item Description"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="status"></label>
      <select v-model="editable.status" name="status" id="status" class="form-control">
        <option disabled selected value="">
          Please choose a status
        </option>
        <option>pending</option>
        <option>in-progress</option>
        <option>review</option>
        <option>done</option>
      </select>
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
import { backlogItemsService } from '../services/BacklogItemsService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,

      async createBacklogItem() {
        try {
          await backlogItemsService.createBacklogItem(editable.value, route.params.id)
          editable.value = {}
          Pop.toast('Item Created!', 'success')
          const modal = Modal.getInstance(document.getElementById('backlog-form'))
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
