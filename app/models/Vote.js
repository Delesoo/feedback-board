import mongoose, {Schema, model, models} from 'mongoose';

const voteSchema = new Schema({
    userEmail: {type: String},
    feedbackId: {type: mongoose.Types.ObjectId, required: true},
}, {
    timestamps: true,
});

export const Vote = models?.Vote || model('Vote', voteSchema);