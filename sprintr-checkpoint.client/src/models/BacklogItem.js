
export class BacklogItem {
  constructor(backlogItemData) {
    this.name = backlogItemData.name
    this.description = backlogItemData.description
    this.status = backlogItemData.status
    this.projectId = backlogItemData.projectId
    this.creator = backlogItemData.creator
    this.id = backlogItemData.id
    this.color = backlogItemData.color
    this.creatorId = backlogItemData.creator.id
  }
}
