
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:id', this.getProjects)
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectsService.getProjects(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getProject(req, res, next) {
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
      res.send(req.body)
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
