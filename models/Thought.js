const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // Must be between 1 and 280 characters

        },
        createdAt: {
            type: Date,
            // Set default value to the current timestamp
            // Use a getter method to format the timestamp on query

        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thought = model('thought', thoughtSchema);

module.exports = Thought;