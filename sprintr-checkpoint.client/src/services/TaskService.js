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
  }

  async createTask(newTask, projectId) {
    const res = await api.post(`api/projects/${projectId}/tasks`, newTask)
    logger.log('createTask', res)
    AppState.tasks = [...AppState.tasks, (new Task(res.data))]
  }
}

export const tasksService = new TasksService()
