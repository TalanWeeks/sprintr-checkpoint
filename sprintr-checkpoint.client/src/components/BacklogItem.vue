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
          <div class=" m-0 p-2" v-if="account.id == backlogItem.creatorId">
            <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteBacklogItem(backlogItem.id)"></i>
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
                <button @click="getNotes()" type="button" class="btn btn-success m-2" :data-bs-target="'#notes-' + backlogItem.id" data-bs-toggle="modal">
                  Show Notes
                </button>
              </li>
              <li>
                <button class="btn btn-success m-2" :data-bs-target="'#task-form-' + backlogItem.id" data-bs-toggle="modal">
                  Create Tasks
                </button>
              </li>
              <li>
                <button @click="getTasks()" class="btn btn-success m-2" :data-bs-target="'#tasks-' + backlogItem.id" data-bs-toggle="modal">
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
      Notes for {{ backlogItem.name }}
    </template>
    <template #modal-body>
      <Note v-for="n in notes" :key="n.id" :note="n" />
    </template>
  </Modal>
  <Modal :id="'task-form-' + backlogItem.id">
    <template #modal-title>
      Create Task for {{ backlogItem.name }}
    </template>
    <template #modal-body>
      <TaskForm :backlog-item="backlogItem" />
    </template>
  </Modal>
  <Modal :id="'tasks-' + backlogItem.id">
    <template #modal-title>
      Tasks for {{ backlogItem.name }}
      Total Weight:
      <!-- NOTE total weight variable interpolated here -->
    </template>
    <template #modal-body>
      <Task v-for="t in tasks" :key="t.id" :task="t" />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { BacklogItem } from '../models/BacklogItem'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService.js'
import { tasksService } from '../services/TaskService.js'

export default {
  props: {
    backlogItem: { type: BacklogItem, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      notes: computed(() => AppState.notes),
      tasks: computed(() => AppState.tasks),
      backlogItems: computed(() => AppState.backlogItems),
      account: computed(() => AppState.account),
      async getNotes() {
        await notesService.getNotes(route.params.id, props.backlogItem.id)
      },
      async getTasks() {
        await tasksService.getTasks(route.params.id, props.backlogItem.id)
      },
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
