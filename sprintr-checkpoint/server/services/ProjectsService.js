import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ProjectsService {
  async createProject(projectData) {
    const project = await dbContext.Project.create(projectData)
    return project
  }

  async getProjects(query) {
    const projects = await dbContext.Project.find(query).populate('creator')
    return projects
  }

  async editProject(projectId, projectData) {
    const project = await this.getProjectById(projectId)
    project.name = projectData.name || project.name
    project.description = projectData.description || project.description
    project.creatorId = projectData.creatorId || project.creatorId
    project.id = projectData.id || project.id
    await project.save()
    return project
  }

  async getProjectById(projectId) {
    const project = await dbContext.Project.findById(projectId).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

  async deleteProject(projectId) {
    const deletedProject = await dbContext.Project.findByIdAndRemove(projectId)
    return deletedProject
  }
}

export const projectsService = new ProjectsService()
