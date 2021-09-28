import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('create')
  }
}

export const projectService = new ProjectsService()
