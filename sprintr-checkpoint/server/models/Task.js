import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    name: { type: String },
    weight: { type: Number },
    completedOn: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId },
    backlogItemId: { type: Schema.Types.ObjectId },
    projectId: { type: String },
    creatorId: { type: Schema.Types.ObjectId },
    isCompleted: { type: Boolean }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
