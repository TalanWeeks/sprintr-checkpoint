import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class NotesService {
  async getNotesByProjectId(projectId) {
    const notes = await dbContext.Note.find({ projectId }).populate('creator')
    return notes
  }

  async getNoteById(noteId) {
    const note = await dbContext.Note.findById(noteId)
    if (!note) {
      throw new BadRequest('invalid note id dummy')
    }
  }

  async createNote(noteData) {
    const note = await dbContext.Note.create(noteData)
    await note.populate('creator')
    return note
  }

  async deleteNote(noteId) {
    const note = await dbContext.Note.findByIdAndRemove(noteId)
    return note
  }
}
export const notesService = new NotesService()
