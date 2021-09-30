<template>
  <div class="col-12">
    <p><b>{{ note.creator.name }}: </b>{{ note.body }}</p>
  </div>
</template>

<script>
import { Note } from '../models/Note.js'
export default {
  props: {
    note: { type: Note, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
