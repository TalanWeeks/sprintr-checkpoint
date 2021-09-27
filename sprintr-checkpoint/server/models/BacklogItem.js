import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'] },
  projectId: { type: Schema.Types.ObjectId },
  sprintId: { type: Schema.Types.ObjectId },
  creatorId: { type: Schema.Types.ObjectId },
  color: { type: String }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
