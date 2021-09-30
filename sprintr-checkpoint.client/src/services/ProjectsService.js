import { AppState } from '../AppState.js'
import { Project } from '../models/Project.js'
import { logger } from '../utils/Logger.js'
import { convertToQuery } from '../utils/Query.js'
import { api } from './AxiosService.js'
class ProjectsService {
  async getProjects(query) {
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log('getProjects', res)
    if (res.data.length > 1) {
      AppState.projects = res.data.map(p => new Project(p))
      logger.log('projects after map', AppState.projects)
    } else {
      AppState.currentProject = new Project(res.data)
    }
  }

  async getProjectById(id) {
    AppState.currentProject = {}
    const res = await api.get('api/projects/' + id)
    logger.log('getProjectById', res)
    AppState.currentProject = res.data
    logger.log('currentProject after getById', AppState.currentProject)
  }

  async createProject(newProject) {
    AppState.createProject = []
    const res = await api.post('api/projects', newProject)
    logger.log('createProject res', res)
    AppState.createdProject = res.data
    AppState.projects.shift(new Project(res.data))
  }

  async deleteProject(projectId) {
    const res = await api.delete(`api/projects/${projectId}`)
    logger.log('deleteProject', res)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}

export const projectsService = new ProjectsService()
