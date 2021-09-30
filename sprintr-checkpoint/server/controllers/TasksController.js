import BaseController from '../utils/BaseController.js'
import { tasksService } from '../services/TasksService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:id/tasks')
    this.router
      .get('', this.getTasks)
      .get('/:taskId', this.getTask)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:taskId', this.deleteTask)
      .put('/:taskId', this.editTask)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasksByBacklogId()
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

  async editTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.editTask(req.params.taskId, req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
