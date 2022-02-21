import mongoose from 'mongoose'

import { Sections } from '@/constants/money-tracker'

const cashflowSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(Sections)
  },
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: [true, 'Please add date'],
    // MM-DD-YYYY
    validate: /^((1[0-2])|((0[1-9])))-((0[1-9])|(1\d)|(2\d)|(3[0,1]))-\d\d\d\d$/
  },
  files: {
    type: [String],
    required: true,
    maxLength: 2000
  },
  status: {
    type: Boolean,
    required: true
  },
  targetMonth: {
    type: String,
    required: true,
    // MM-YYYY
    validate: /^((1[0-2])|((0[1-9])))-\d\d\d\d$/
  }
})

export default mongoose.models.Cashflow ||
  mongoose.model('cashflow', cashflowSchema)
