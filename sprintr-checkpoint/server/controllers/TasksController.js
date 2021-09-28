import BaseController from '../utils/BaseController.js'
import { tasksService } from '../services/TasksService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('/:projectId/tasks', this.getTasks)
      .get('/:projectId/tasks/:taskId', this.getTask)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:projectId/tasks', this.createTask)
      .delete('/:projectId/tasks/:taskId', this.deleteTask)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasksByProjectId(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTask(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await tasksService.deleteTask(req.params.taskId)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
