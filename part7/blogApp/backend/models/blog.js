const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },

  author: {
      type: String,
      required: true
  },

  url: {
      type: String,
      required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
  likes: {
      type: Number
  }
  
})

blogSchema.plugin(uniqueValidator)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)