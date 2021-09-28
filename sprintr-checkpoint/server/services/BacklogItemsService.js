import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BacklogItemsService {
  async getBacklogItems(query) {
    const backlogItems = await dbContext.BacklogItem.find(query)
    return backlogItems
  }

  async getBacklogItemById(backlogItemId) {
    const backlogItem = await dbContext.BacklogItem.findById(backlogItemId)
    if (!backlogItem) {
      throw new BadRequest('invalid backlogItem Id dummy')
    }
    return backlogItem
  }

  async createBacklogItem(backlogItemData) {
    const backlogItem = await dbContext.BacklogItem.create(backlogItemData)
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
    backlogItem.status = body.statue || backlogItem.status
    backlogItem.color = body.color || backlogItem.color
  }
}

export const backlogItemsService = new BacklogItemsService()
