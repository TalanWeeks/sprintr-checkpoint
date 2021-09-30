export class Sprint {
  constructor(sprintData) {
    this.name = sprintData.name
    this.createdAt = sprintData.createdAt
    this.endDate = sprintData.endDate
    this.isOpen = sprintData.isOpen
    this.assignedTo = sprintData.assignedTo
    this.projectId = sprintData.projectId
    this.creatorId = sprintData.creatorId
    this.id = sprintData.id
  }
}
