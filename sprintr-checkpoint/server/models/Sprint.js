import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema(
  {
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    isOpen: { type: Boolean },
    assignedTo: { type: Schema.Types.ObjectId },
    projectId: { type: Schema.Types.ObjectId },
    creatorId: { type: Schema.Types.ObjectId }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
