import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: { type: String },
  description: { type: String },
  creatorId: { type: Schema.Types.ObjectId }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
