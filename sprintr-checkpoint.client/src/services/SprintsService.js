import { AppState } from '../AppState.js'
import { Sprint } from '../models/Sprint.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class SprintsService {
  async getSprints(projectId) {
    AppState.sprints = []
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('getSprints', res)
    AppState.sprints = res.data.map(s => new Sprint(s))
    logger.log('sprints after get', res)
  }

  async createSprint(newSprint, projectId) {
    const res = await api.post(`api/projects/${projectId}/sprints`, newSprint)
    logger.log('createSprint', res)
    AppState.sprints = [...AppState.sprints, (new Sprint(res.data))]
  }
}

export const sprintsService = new SprintsService()
