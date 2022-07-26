const { User, Reaction, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
            !thought 
            ? res.status(404).json({ message: 'No thought found!'}) 
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createthought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughtText: thought}},
                { runValidators: true, new: true}
            );
        })
        .then((user) => 
            !user
            ? res.status(404).json({ message: "No User found!"})
            : res.json("Thought Saved!"))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: "No thought found!"})
                : res.json(thought)
        )
            .then( () => 
                res.json({ message: "thought deleted!" })
        )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {  _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: "No thought found!"})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            {  _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: "No thought found!"})
                : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {  _id: req.params.thoughtId },
            { $pull: { reactions: req.body.reactionId} },
            { runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: "No thought found!"})
                : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
};