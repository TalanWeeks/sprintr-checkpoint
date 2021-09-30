import { AppState } from '../AppState.js'
import { Note } from '../models/Note.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class NotesService {
  async getNotes(projectId, backlogItemId) {
    AppState.notes = []
    const res = await api.get(`api/projects/${projectId}/notes`)
  }

  async createNote(body, projectId) {
    const res = await api.post(`api/project/${projectId}/notes`, body)
    logger.log('createNote', res)
    AppState.notes = [...AppState.notes, (new Note(res.data))]
  }
}

export const notesService = new NotesService()
