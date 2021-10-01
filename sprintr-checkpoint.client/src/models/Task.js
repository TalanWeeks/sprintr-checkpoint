export class Task {
  constructor(taskData) {
    this.name = taskData.name
    this.weight = taskData.weight
    this.completedOn = taskData.completedOn
    this.assignedTo = taskData.assignedTo
    this.creatorId = taskData.creatorId
    this.isComplete = taskData.isComplete
    this.creator = taskData.creator
    this.id = taskData.id
  }
}
