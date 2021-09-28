import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class SprintsService {
  async createSprint(sprintData) {
    const sprint = await dbContext.Sprint.create(sprintData)
    return sprint
  }

  async getSprintsByProjectId(projectId) {
    const sprints = await dbContext.Sprint.find({ projectId }).populate('creator')
    return sprints
  }

  async getSprintByProjectId(projectId, spintId) {
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
