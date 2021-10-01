<template>
  <div class="Sprint">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-black text-light">
        <div class="col-5">
          <h4>
            Sprint Title:
          </h4>
          <span class="text-success">{{ sprint.name }}</span>
        </div>
        <div class="col-5">
          <h4>
            Sprint Created:
          </h4>
          <span class="text-success">{{ new Date(sprint.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="col-2">
          <div class=" m-0 p-2">
            <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteSprint(sprint.id)" v-if="account.id == sprint.creatorId"></i>
          </div>

          <label for="backlogItems" class="m-1">Asign a BackLog:</label>

          <select name="backlogItems" id="backlogItems" @change="addBacklogToSprint($event)">
            <option class="unselectable">
              options
            </option>
            <option v-for="backlogItem in backlogItems" :key="backlogItem" :value="backlogItem.id">
              {{ backlogItem.name }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="backlogItemsFilter.length > 0">
        <div>
          <div class="row row shadow rounded my-2 py-3 bg-dark text-light">
            <div class="col-5">
              <h4>
                Backlog Item:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[0].name }}</span>
            </div>
            <div class="col-5">
              <h4>
                Backlog Description:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[0].description }}</span>
            </div>
          </div>
          <div class="row row shadow rounded my-2 py-3 bg-dark text-light" v-if="backlogItemsFilter.length > 1">
            <div class="col-5">
              <h4>
                Backlog Item:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[1].name }}</span>
            </div>
            <div class="col-5">
              <h4>
                Backlog Description:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[1].description }}</span>
            </div>
          </div>
          <div class="row row shadow rounded my-2 py-3 bg-dark text-light" v-if="backlogItemsFilter.length > 2">
            <div class="col-5">
              <h4>
                Backlog Item:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[2].name }}</span>
            </div>
            <div class="col-5">
              <h4>
                Backlog Description:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[2].description }}</span>
            </div>
          </div>
          <div class="row row shadow rounded my-2 py-3 bg-dark text-light" v-if="backlogItemsFilter.length > 3">
            <div class="col-5">
              <h4>
                Backlog Item:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[4].name }}</span>
            </div>
            <div class="col-5">
              <h4>
                Backlog Description:
              </h4>
              <span class="text-success">{{ backlogItemsFilter[4].description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import { BacklogItem } from '../models/BacklogItem'
export default {
  props: {
    sprint: { type: Object, required: true },
    backlog: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()

    return {
      account: computed(() => AppState.account),
      backlogItems: computed(() => AppState.backlogItems),
      backlogItemsFilter: computed(() => AppState.backlogItems.filter(b => b.sprintId === props.sprint.id)),

      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(route.params.id, sprintId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async addBacklogToSprint(e) {
        try {
          const projectId = route.params.id
          const backlogItemId = e.target.options[e.target.options.selectedIndex].value
          await backlogItemsService.editBacklogItem(props.sprint.id, backlogItemId, projectId)
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
