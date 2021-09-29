import { AppState } from '../AppState.js'
import { Sprint } from '../models/Sprint.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class SprintsService {
  async createSprint(newSprint, projectId) {
    const res = await api.post(`api/projects/${projectId}/sprints`)
    logger.log('createSprint', res)
    AppState.sprints.shift(new Sprint(res.data))
  }
}

export const sprintsService = new SprintsService()