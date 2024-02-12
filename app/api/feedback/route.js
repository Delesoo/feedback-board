import mongoose from "mongoose";
import {Feedback} from "@/app/models/Feedback"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
   const jsonBody = await request.json();
   const {title, description, uploads} = jsonBody;
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   const session = await getServerSession(authOptions);
   const userEmail = session.user.email;
   await Feedback.create({title, description, uploads, userEmail});
   return Response.json(jsonBody);
}

export async function GET() {
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   return Response.json(await Feedback.find());
}
