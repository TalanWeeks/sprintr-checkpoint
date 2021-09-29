
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:projectId', this.getProjectById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .put('/:projectId', this.editProject)
      .delete('/:projectId', this.deleteProject)
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectsService.getProjects(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async createProject(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async editProject(req, res, next) {
    try {
      const project = await projectsService.editProject(req.params.galaxyId, req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      const project = await projectsService.deleteProject(req.params.projectId)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
