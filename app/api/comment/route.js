import { Comment } from "@/app/models/Comment";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const jsonBody = await req.json();
    const session = await getServerSession(authOptions);
    const commentDoc = await Comment.create({
        text: jsonBody.text,
        uploads: jsonBody.uploads,
        userEmail: session.user.email,
        feedbackId: jsonBody.feedbackId,
    });
    return Response.json(commentDoc);
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    if (url.searchParams.get('feedbackId')) {
        const result = await Comment
            .find({feedbackId:url.searchParams.get('feedbackId')})
            .populate('user');
        return Response.json(
            result.map(doc => {
                const {userEmail, ...commentWithoutEmail} = doc.toJSON();
                return commentWithoutEmail;
            })
        );
    }
    return Response.json(false);
}