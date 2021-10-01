import { AppState } from '../AppState.js'
import { Task } from '../models/Task.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(projectId, backlogItemId) {
    AppState.tasks = []
    const res = await api.get(`api/projects/${projectId}/tasks`)
    const filtered = res.data.filter(t => t.backlogItemId === backlogItemId)
    AppState.tasks = filtered.map(t => new Task(t))
    logger.log('tasks after filter', res)
  }

  async createTask(newTask, projectId) {
    const res = await api.post(`api/projects/${projectId}/tasks`, newTask)
    logger.log('createTask', res)
    AppState.tasks = [...AppState.tasks, (new Task(res.data))]
  }

  async toggleChecked(taskId, projectId) {
    const task = AppState.tasks.filter(t => t.id === taskId)
    const actualTask = task[0]
    if (actualTask.isComplete === false) {
      actualTask.isComplete = true
    } else {
      actualTask.isComplete = false
    }
    logger.log(actualTask.isComplete)
    const res = await api.put(`api/projects/${projectId}/tasks/${taskId}`, actualTask)
    logger.log('checked after put', res)
  }

  async deleteTask(taskId, projectId) {
    const res = await api.delete(`api/projects/${projectId}/tasks/${taskId}`)
    logger.log('deleteTask', res)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }
}

export const tasksService = new TasksService()
