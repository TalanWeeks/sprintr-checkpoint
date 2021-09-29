
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:id/sprints')
    this.router
      .get('', this.getSprints)
      // .get('/:sprintId', this.getSprint)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .delete('/:sprintId', this.deleteSprint)
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getSprintsByProjectId(req.params.projectId)
      return res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getSprint(req, res, next) {
    try {
      const sprint = await sprintsService.getSprintByProjectId(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async deleteSprint(req, res, next) {
    try {
      const sprint = await sprintsService.deleteSprint(req.params.sprintId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
}
