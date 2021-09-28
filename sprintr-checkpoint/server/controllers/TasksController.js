import BaseController from '../utils/BaseController.js'
import { tasksService } from '../services/TasksService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getTasks)
      .get('/:taskId', this.getTasksById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:taskId', this.deleteTask)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTasksById(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.taskId)
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
