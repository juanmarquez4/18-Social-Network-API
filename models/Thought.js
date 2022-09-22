const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlenght: 1,
            maxlenght: 280,
            // Must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Set default value to the current timestamp
            // Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })
    
const Thought = model('thought', thoughtSchema);

module.exports = Thought;