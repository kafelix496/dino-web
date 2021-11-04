import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxLength: [40, 'Title cannot be more than 40 characters']
  }
})

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema)
