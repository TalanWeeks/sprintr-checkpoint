import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class SprintsService {
  async createSprint(sprintData) {
    const sprint = await dbContext.Sprint.create(sprintData)
    return sprint
  }

  async getSprints(query) {
    const sprints = await dbContext.Sprint.find(query).populate('creator')
    return sprints
  }

  async getSprintById(sprintId) {
    const sprint = await dbContext.Sprint.findById(sprintId).populate('creator', 'name picture')
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
