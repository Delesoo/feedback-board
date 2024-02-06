import { Schema, models, model } from "mongoose";

const feedbackSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    uploads: {type: [String]},
}, {timestamps: true});

export const Feedback = models?.Feedback || model('Feedback', feedbackSchema);