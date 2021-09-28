import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: [{ type: String }],
    backlogitemId: { type: Schema.Types.ObjectId },
    projectId: { type: Schema.Types.ObjectId },
    creatorId: { type: Schema.Types.ObjectId }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
