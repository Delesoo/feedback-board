import { useEffect, useState } from "react";
import Button from "./Button";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import axios from "axios";

export default function FeedbackItemPopupComments({feedbackId}) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios.get('/api/comment?feedbackId='+feedbackId).then(res => {
            setComments(res.data);
        });
    }, []);
    return (
        <div className="p-8">
            {comments?.length > 0 && comments.map(comment => (
                <div className="flex gap-4 mb-8">
                    <Avatar />
                        <div>
                            <p className="text-gray-600">{comment.text}</p>
                            <div className="text-gray-400 mt-2 text-sm">Anonymous &middot; a few seconds ago</div>
                        </div>
                </div> 
            ))}
            <CommentForm feedbackId={feedbackId} />
        </div>
    );
}