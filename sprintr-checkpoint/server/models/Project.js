import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  creatorId: { type: Schema.Types.ObjectId, require: true },
  id: { type: Schema.Types.ObjectId, require: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
