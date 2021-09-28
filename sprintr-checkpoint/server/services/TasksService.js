import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class TasksService {
  async getTasks(query) {
    const tasks = await dbContext.Task.find(query)
    return tasks
  }

  async getTaskById(taskId) {
    const task = await dbContext.Task.findById(taskId)
    if (!task) {
      throw new BadRequest('invalid task id dummy')
    }
  }

  async createTask(taskData) {
    const task = await dbContext.Task.create(taskData)
    return task
  }

  async deleteTask(taskId) {
    const task = await dbContext.Task.findByIdAndRemove(taskId)
    return task
  }
}
export const tasksService = new TasksService()
