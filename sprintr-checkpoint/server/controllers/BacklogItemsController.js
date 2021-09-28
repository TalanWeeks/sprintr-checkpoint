import BaseController from '../utils/BaseController.js'
import { backlogItemsService } from '../services/BacklogItemsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      // .get('/:projectId/backlog', this.getBacklogItems)
      .get('/:projectId/backlog', this.getBacklogItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:projectId/backlog', this.createBacklogItem)
      .delete('/:projectId/backlog/:backlogItemId', this.deleteBacklogItem)
      .put('/:projectId/backlog/:backlogItemId', this.editBacklogItem)
      // .put(':/backlogItemId', this.editBacklogItem)
  }

  // async getBacklogItems(req, res, next) {
  //   try {
  //     const backlogItems = await backlogItemsService.getBacklogItems(req.query)
  //     res.send(backlogItems)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemsByProjectId(req.params.projectId)
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
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }
}
