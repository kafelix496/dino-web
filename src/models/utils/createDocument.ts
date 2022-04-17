import mongoose from 'mongoose'

export const createDocument = (
  modelName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>
) => mongoose.models[modelName] || mongoose.model(modelName, schema)
