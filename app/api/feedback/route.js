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
   if (!session) {
      return Response.json(false);
   }
   const userEmail = session.user.email;
   const feedbackDoc = await Feedback.create({title, description, uploads, userEmail});
   return Response.json(feedbackDoc);
}

export async function PUT(request) {
   const jsonBody = await request.json();
   const {title, description, uploads, id} = jsonBody;
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   const session = await getServerSession(authOptions);
   if(!session) {
      return Response.json(false);
   }
   const newFeedbackDoc =  await Feedback.updateOne(
       {_id:id, userEmail:session.user.email},
       {title, description, uploads},
   );
   return Response.json(newFeedbackDoc);
}

export async function GET(req) {
   const url = new URL(req.url);
   const mongoUrl = process.env.MONGO_URL;
   mongoose.connect(mongoUrl);
   if (url.searchParams.get('id')) {
      return Response.json(
         await Feedback.findById(url.searchParams.get('id'))
      );
   } else {
      const sortParam = url.searchParams.get('sort'); 
      const lastId = url.searchParams.get('lastId');
      let sortDef; 
      if (sortParam === 'latest') {
         sortDef = {createdAt: -1};
      }
      if (sortParam === 'oldest') {
         sortDef = {createdAt: 1};
      }
      if (sortParam === 'votes') {
         sortDef = {votesCountCached: -1};
      }

      const filter = lastId ? {_id:{$gt:lastId}} : null;
      return Response.json(
         await Feedback.find(filter,null,{
            sort: sortDef,
            limit: 10,
         }).populate('user'));
   }
}
