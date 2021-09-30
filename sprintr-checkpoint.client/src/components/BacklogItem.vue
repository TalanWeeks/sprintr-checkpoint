<template>
  <div class="Backlog">
    <div class="container-fluid">
      <div class="row shadow rounded mb-4 py-3 bg-dark text-light">
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
          <div class=" m-0 p-2">
            <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteBacklogItem(backlogItem.id)" v-if="account.id == backlogItem.creatorId"></i>
          </div>
          <div class="dropdown">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Backlog Options
            </button>
            <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="btn btn-success m-2" :data-bs-target="'#note-form-' + backlogItem.id" data-bs-toggle="modal">
                  Create Note
                </button>
              </li>
              <li>
                <button class="btn btn-success m-2" :data-bs-target="'#notes-' + backlogItem.id" data-bs-toggle="modal">
                  Show Notes
                </button>
              </li>
              <li>
                <button class="btn btn-success m-2" :data-bs-target="'#tasks-form-' + backlogItem.id" data-bs-toggle="modal">
                  Create Tasks
                </button>
              </li>
              <li>
                <button class="btn btn-success m-2" :data-bs-target="'#tasks-' + backlogItem.id" data-bs-toggle="modal">
                  Show Tasks
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'note-form-' + backlogItem.id">
    <template #modal-title>
      Create Note for {{ backlogItem.name }}
    </template>
    <template #modal-body>
      <NoteForm :backlog-item="backlogItem" />
    </template>
  </Modal>
  <Modal :id="'notes-' + backlogItem.id">
    <template #modal-title>
      Note's for {{ backlogItem.name }}
    </template>
    <template #modal-body>
      <!--NOTE make note component -->
    </template>
  </Modal>
</template>

<script>
import { AppState } from '../AppState'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'

export default {
  props: {
    backlogItem: { type: Object, required: true }
  },
  setup(props) {
    return {
      backlogItems: () => AppState.backlogItems,
      account: () => AppState.account,
      async deleteBacklogItem(BacklogItemId) {
        try {
          await backlogItemsService.deleteBacklogItem(BacklogItemId)
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
