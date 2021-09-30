<template>
  <form @submit.prevent="createNote()">
    <div class="form-group">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="this is not needed"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="body"></label>
      <input v-model="editable.body"
             type="text"
             name="body"
             id="body"
             placeholder="Note Body"
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
import { useRoute } from 'vue-router'
import { BacklogItem } from '../models/BacklogItem.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { notesService } from '../services/NotesService.js'
export default {
  props: {
    backlogItem: { type: BacklogItem, required: true }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,

      async createNote() {
        try {
          editable.value.backlogItemId = props.backlogItem.id
          editable.value.projectId = route.params.id
          await notesService.createNote(editable.value, route.params.id)
          editable.value = {}
          Pop.toast('Note Created!', 'success')
          const modal = Modal.getInstance(document.getElementById(`note-form-${props.backlogItem.id}`))
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
