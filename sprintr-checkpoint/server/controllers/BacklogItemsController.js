import BaseController from '../utils/BaseController.js'
import { backlogItemsService } from '../services/BacklogItemsService.js'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/backlogitems')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogItemId', this.getBacklogItemById)
      .post('', this.createBacklogItem)
      .delete('/:backlogItemId', this.deleteBacklogItem)
      .put(':/backlogItemId', this.editBacklogItem)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getBacklogItems(req.query)
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemById(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.createBacklogItem(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async deleteBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.deleteBacklogItem(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }
}
