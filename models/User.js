const { Schema, model } = require('mongoose');
const validator = require('validator')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate:{
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
              }
        },
        thoughts: [{
           type: Schema.Types.ObjectId,
           ref: 'Thought'
            // Array of _id values referencing the Thought model
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
            // Array of _id values referencing the User model (self-reference)
        }]
    },
    {
        toJason: {
            virtuals: true,
        },
        id: false,
        
    }
);

// Schema Settings: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length
    })

const User = model('user', userSchema);

module.exports = User;