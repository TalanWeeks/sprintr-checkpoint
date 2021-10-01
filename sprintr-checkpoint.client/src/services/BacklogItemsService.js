import { AppState } from '../AppState.js'
import { BacklogItem } from '../models/BacklogItem.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class BacklogItemsService {
  async getBacklogItems(projectId) {
    AppState.backlogItems = []
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('getBacklogItems', res)

    AppState.backlogItems = res.data.map(b => new BacklogItem(b))
    logger.log('backlog after get', AppState.backlogItems)
  }

  async createBacklogItem(newItem, projectId) {
    const res = await api.post(`api/projects/${projectId}/backlog`, newItem)
    logger.log('createBacklogItem', res)
    AppState.backlogItems = [...AppState.backlogItems, new BacklogItem(res.data)]
  }

  async deleteBacklogItem(backlogItemId) {
    const res = await api.delete(`api/projects/${backlogItemId}`)
    logger.log('deletebacklogItem', res)
    AppState.backlogItems = AppState.backlogItems.filter(p => p.id !== backlogItemId)
  }

  async editBacklogItem(sprintId, backlogItemId, projectId) {
    // const res = await api.get(`api/projects/${projectId}/backlog/${backlogItemId}`)
    // logger.log(res.data)
    const editedBacklog = await api.put(`api/projects/${projectId}/backlog/${backlogItemId}`, { sprintId })
    logger.log(editedBacklog)
    this.getBacklogItems(projectId)
  }
}

export const backlogItemsService = new BacklogItemsService()
