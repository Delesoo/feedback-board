import { Vote } from "@/app/models/Vote";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request) {
    mongoose.connect(process.env.MONGO_URL);
    const jsonBody = await request.json();
    const {feedbackId} = jsonBody;
    const session = await getServerSession(authOptions);
    const {email:userEmail} = session.user;
    const voteDoc = await Vote.create({feedbackId, userEmail});
    return Response.json(voteDoc);
}