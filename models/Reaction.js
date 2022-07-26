const { Schema, Types } = require('mongoose');
const dayJs = require('dayjs');
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayJs.extend(advancedFormat);

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: dayJs(),
        get: (date) => dayJs(date).format("MMM Do YYYY [at] h:mm A"),
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
);

module.exports = reactionSchema;
