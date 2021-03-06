import BaseController from '../utils/BaseController.js'
import { backlogItemsService } from '../services/BacklogItemsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects/:id/backlog')
    this.router
      .get('/:backlogItemId', this.getBacklogItemById)
      .get('', this.getBacklogItemByProjectId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .delete('/:backlogItemId', this.deleteBacklogItem)
      .put('/:backlogItemId', this.editBacklogItem)
      .put(':/backlogItemId', this.editBacklogItem)
  }

  // async getBacklogItems(req, res, next) {
  //   try {
  //     const backlogItems = await backlogItemsService.getBacklogItems(req.query)
  //     res.send(backlogItems)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getBacklogItemByProjectId(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemsByProjectId(req.params.id)
      res.send(backlogItem)
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
      req.body.projectId = req.params.id
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
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }
}
