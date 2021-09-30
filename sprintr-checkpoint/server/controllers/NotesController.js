
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService.js'
export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:id/notes')
    this.router
      .get('', this.getNotes)
      .get('/:notesId', this.getNoteById)
      //    ^^^^^^^^^^ this may be wrong but we may not need this function
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)

      .delete('/:projectId/notes/:notesId', this.deleteNote)
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotesByBacklogId()
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      const note = await notesService.getNoteById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
