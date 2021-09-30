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
          <h4>Backlog Status:</h4>

          <span class="text-success">{{ backlogItem.status }}</span>
        </div>
        <div class="col-4 text-center">
          <button class="btn btn-success m-2" :data-bs-target="'#note-form-' + backlogItem.id" data-bs-toggle="modal">
            Create Note
          </button>
          <button class="btn btn-success m-2">
            Show Note's
          </button>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'note-form-' + backlogItem.id">
    <template #modal-title>
      Create Note
    </template>
    <template #modal-body>
      <NoteForm :backlog-item="backlogItem" />
    </template>
  </Modal>
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
