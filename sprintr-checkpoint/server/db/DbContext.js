import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem.js'
import { NoteSchema } from '../models/Note'
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Note = mongoose.model('Note', NoteSchema);

  Task = mongoose.model('Task', TaskSchema);

  Sprint = mongoose.model('Sprint', SprintSchema);

  BacklogItem = mongoose.model('BacklogItem', BacklogItemSchema);

  Project = mongoose.model('Project', ProjectSchema);
}

export const dbContext = new DbContext()
