import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class SprintsService {
  async createSprint(sprintData) {
    const sprint = await dbContext.Sprint.create(sprintData)
    await sprint.populate('creator')
    return sprint
  }

  async getSprintsByProjectId(projectId) {
    const sprints = await dbContext.Sprint.find({ projectId }).populate('creator', 'id name picture')
    if (!sprints) {
      throw new BadRequest('no project id or no sprints silly')
    }
    return sprints
  }

  async getSprintByProjectId(projectId) {
    const sprint = await dbContext.Sprint.findById(projectId).populate('creator', 'name picture')
    if (!sprint) {
      throw new BadRequest('Invalid sprint Id')
    }
    return sprint
  }

  async deleteSprint(sprintId) {
    const deletedSprint = await dbContext.Sprint.findByIdAndRemove(sprintId)
    return deletedSprint
  }
}

export const sprintsService = new SprintsService()
