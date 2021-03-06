import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  currentProject: {},
  createdProject: [],
  backlogItems: [],
  notes: [],
  tasks: [],
  sprints: [],
  sprintBacklog: [],
  totalWeight: 0

})
