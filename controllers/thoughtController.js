const {Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
               .then((thoughts) => res.json(thoughts))
               .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({_id: requestAnimationFrame.params.thoughtId})
            .select('-__v')
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: {thoughts: thought.id}}
                )
                res.json(thought)
            } )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
            !thought
                ? res.statys(404).json({message: 'No thought with that ID'})
                : User.deleteMany({ _id: { $in: thought.users }}) //double check this
            )
            .then(() => res.json({ message: 'User and thoughts deleted!'}))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this is!'})
                : res,json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
     //add reactions
    addReaction(req, res) {
        User.create
    }

   

    
};