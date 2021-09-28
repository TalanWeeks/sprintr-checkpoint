import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], require: true },
  projectId: { type: Schema.Types.ObjectId, require: true },
  sprintId: { type: Schema.Types.ObjectId, require: true },
  creatorId: { type: Schema.Types.ObjectId, require: true },
  color: { type: String }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

BacklogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
