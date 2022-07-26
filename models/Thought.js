const { Schema, model } = require('mongoose');
const dayJs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayJs.extend(advancedFormat);
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: dayJs(),
        get: (date) => dayJs(date).format("MMM Do YYYY [at] h:mm A"),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    }, 
    id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;