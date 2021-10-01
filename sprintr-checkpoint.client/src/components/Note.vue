<template>
  <div class="col-12 d-flex">
    <img :src="note.creator.picture" alt="" height="50">
    <p><b>{{ note.creator.name }}: </b>{{ note.body }}</p>
    <div v-if="account.id === note.creatorId">
      <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteNote(note.id)"></i>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Note } from '../models/Note.js'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { notesService } from '../services/NotesService.js'
export default {
  props: {
    note: { type: Note, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(noteId, route.params.id)
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
