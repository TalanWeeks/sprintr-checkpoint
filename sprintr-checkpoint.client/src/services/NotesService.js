import { AppState } from '../AppState.js'
import { Note } from '../models/Note.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class NotesService {
  async getNotes(projectId, backlogItemId) {
    AppState.notes = []
    const res = await api.get(`api/projects/${projectId}/notes`)
    const filtered = res.data.filter(n => n.backlogItemId === backlogItemId)
    AppState.notes = filtered.map(n => new Note(n))
  }

  async createNote(body, projectId) {
    const res = await api.post(`api/projects/${projectId}/notes`, body)
    logger.log('createNote', res)
    AppState.notes = [...AppState.notes, (new Note(res.data))]
  }

  async deleteNote(noteId, projectId) {
    const res = await api.delete(`api/projects/${projectId}/notes/${noteId}`)
    logger.log('deleteNote', res)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}

export const notesService = new NotesService()
