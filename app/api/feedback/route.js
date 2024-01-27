import mongoose from "mongoose";
import {Feedback} from "@/app/models/Feedback"

export async function POST(request) {
   const jsonBody = await request.json();
   const {title, description, uploads} = jsonBody;
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   await Feedback.create({title, description, uploads});
   return Response.json(jsonBody);
}

export async function GET() {
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   return Response.json(await Feedback.find());
}
