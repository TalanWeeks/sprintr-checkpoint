export class Note {
  constructor(noteData) {
    this.body = noteData.body
    this.backlogItemId = noteData.backlogItemId
    this.projectId = noteData.projectId
    this.creatorId = noteData.creatorId
    this.creator = noteData.creator
    this.id = noteData.id
  }
}
