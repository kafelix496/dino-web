import mongoose from 'mongoose'

export const createDocument = (
  modelName: string,
  projectSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>
) => mongoose.models[modelName] || mongoose.model(modelName, projectSchema)
