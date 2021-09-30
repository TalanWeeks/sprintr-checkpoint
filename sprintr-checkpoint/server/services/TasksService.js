import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class TasksService {
  async getTasksByBacklogId() {
    const tasks = await dbContext.Task.find().populate('creator')
    return tasks
  }

  async getTaskById(taskId) {
    const task = await dbContext.Task.findById(taskId)
    if (!task) {
      throw new BadRequest('invalid task id dummy')
    }
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Task.create(taskData)
    await task.populate('creator')
    return task
  }

  async deleteTask(taskId) {
    const task = await dbContext.Task.findByIdAndRemove(taskId)
    return task
  }

  async editTask(taskId, taskData) {
    const task = await this.getTaskById(taskId)
    task.name = taskData.name || task.name
    task.weight = taskData.weight || task.weight
    task.completedOn = taskData.completedOn || task.completedOn
    task.assignedTo = taskData.assignedTo || task.assignedTo
    task.backlogItemId = taskData.backlogItemId || task.backlogItemId
    task.isComplete = taskData.isComplete || task.isComplete
    await task.save()
    return task
  }
//   name: { type: String },
//     weight: { type: Number },
//     completedOn: { type: Date },
//     assignedTo: { type: Schema.Types.ObjectId },
//     backlogItemId: { type: Schema.Types.ObjectId },
//     projectId: { type: String },
//     creatorId: { type: Schema.Types.ObjectId },
//     isCompleted: { type: Boolean, require: true }
}
export const tasksService = new TasksService()
