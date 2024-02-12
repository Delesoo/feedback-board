import mongoose, {model, models, Schema} from "mongoose";
import { User } from '@/app/models/User';

const commentSchema = new Schema({
    text: {type: String},
    uploads: {type: [String]},
    userEmail: {type: String, required: true},
    feedbackId: {type: mongoose.Types.ObjectId, required: true},
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
});

commentSchema.virtual('user', {
    ref: 'User',
    localField: 'userEmail',
    foreignField: 'email',
    justOne: true,
});

export const Comment = models?.Comment || model('Comment', commentSchema);