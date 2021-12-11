import mongoose from 'mongoose'

// TODO: I can not use @/global-types
// because I get error from api
import { SectionType } from '../../types/money-manager'

const categorySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(SectionType)
  },
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  planned: {
    type: Number,
    required: true,
    min: 0
  },
  actual: {
    type: Number,
    required: true,
    min: 0
  },
  targetMonth: {
    type: String,
    required: true,
    // MM-YYYY
    validate: /^((1[0-2])|((0[1-9])))-\d\d\d\d$/
  }
})

export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema)
