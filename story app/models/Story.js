const mongoose = require('mongoose');
const User = require('./User');

const StorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    body:{
        type:String,
        required:true
    },
    statues:{
        type: String,
        default:'public',
        enum:['public', 'private']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required:true
    }
});

const Story  = mongoose.model('Story',StorySchema);

module.exports = Story;