import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BacklogItemsService {
  async getBacklogItemsByProjectId(projectId) {
    const backlogItems = await dbContext.BacklogItem.find({ projectId }).populate('creator', 'id name picture')
    return backlogItems
  }

  async getBacklogItemById(backlogItemId) {
    const backlogItem = await dbContext.BacklogItem.findById(backlogItemId).populate('creator', 'id name picture')
    if (!backlogItem) {
      throw new BadRequest('invalid backlogItem Id dummy')
    }
    return backlogItem
  }

  async createBacklogItem(backlogItemData) {
    const backlogItem = await dbContext.BacklogItem.create(backlogItemData)
    await backlogItem.populate('creator', 'id name picture')

    return backlogItem
  }

  async deleteBacklogItem(backlogItemId) {
    const backlogItem = await dbContext.BacklogItem.findByIdAndDelete(backlogItemId)
    return backlogItem
  }

  async editBacklogItem(backlogItemId, body) {
    const backlogItem = await this.getBacklogItemById(backlogItemId)
    backlogItem.name = body.name || backlogItem.name
    backlogItem.description = body.description || backlogItem.description
    backlogItem.sprintId = body.sprintId || backlogItem.sprintId
    backlogItem.status = body.status || backlogItem.status
    backlogItem.color = body.color || backlogItem.color
    await backlogItem.save()
    return backlogItem
  }
}

export const backlogItemsService = new BacklogItemsService()
