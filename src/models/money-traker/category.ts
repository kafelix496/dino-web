import mongoose from 'mongoose'

import { SectionType } from '@/global-types/money-tracker'

const categorySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
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
  mongoose.model('category', categorySchema)
