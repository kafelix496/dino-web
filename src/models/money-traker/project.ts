import mongoose from 'mongoose'

import projectSchema from '@/models/common/projectSchema'

export default mongoose.models['mt.project'] ||
  mongoose.model('mt.project', projectSchema)
