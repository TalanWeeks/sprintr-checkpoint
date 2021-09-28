import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

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
  }

  async createBacklogItem(backlogItemData) {
    const backlogItem = await dbContext.BacklogItem.create(backlogItemData)
    return backlogItem
  }

  async deleteBacklogItem(backlogItemId) {
    const backlogItem = await dbContext.BacklogItem.findByIdAndDelete(backlogItemId)
    return backlogItem
  }
// REVIEW not needed
  // async editBacklogItem(backlogItemId, userId, body) {
  //   // do this tomorrow!!!!!
  //   const backlogItem = await this.getBacklogItemById(backlogItemId)
  //   // if(userId !== backlogItem.creatorId..toString()){
  //     throw new Forbidden('Cant edit a ')
  //   }
  // }
}

export const backlogItemsService = new BacklogItemsService()
