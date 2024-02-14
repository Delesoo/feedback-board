import { Comment } from "@/app/models/Comment";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const jsonBody = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json(false);
    }
    const commentDoc = await Comment.create({
        text: jsonBody.text,
        uploads: jsonBody.uploads,
        userEmail: session.user.email,
        feedbackId: jsonBody.feedbackId,
    });
    return Response.json(commentDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const jsonBody = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json(false);
    }
    const {id, text, uploads} = jsonBody;
    const updatedCommentDoc =  await Comment.findOneAndUpdate(
        {userEmail: session.user.email, _id: id},
        {text, uploads},
    );
    return Response.json(updatedCommentDoc);
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    if (url.searchParams.get('feedbackId')) {
        const result = await Comment
            .find({feedbackId:url.searchParams.get('feedbackId')})
            .populate('user');
        return Response.json(result);
    }
    return Response.json(false);
}