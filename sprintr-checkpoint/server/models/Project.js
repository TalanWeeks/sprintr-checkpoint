import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  creatorId: { type: Schema.Types.ObjectId, require: true, ref: 'Account' }

},
{ timestamps: true, toJSON: { virtuals: true } }
)

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
