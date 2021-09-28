import { AppState } from '../AppState.js'
import { Project } from '../models/Project.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects')
    logger.log('getProjects', res)
    AppState.projects = res.data.map(p => new Project(p))
    logger.log('projects after map', AppState.projects)
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('createProject res', res)
    AppState.projects.shift(new Project(res.data))
  }

  async deleteProject(projectId) {
    const res = await api.delete(`api/projects/${projectId}`)
    logger.log('deleteProject', res)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}

export const projectService = new ProjectsService()
