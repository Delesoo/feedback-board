import { useState } from "react";
import Button from "./Button";
import Avatar from "./Avatar";

export default function FeedbackItemPopupComments() {
    const [commentText, setCommentText] = useState('');
    return (
        <div className="p-8">
            <div className="flex gap-4 mb-8">
                <Avatar />
                <div>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus mollis justo, ac placerat lorem bibendum ac. Sed dignissim nunc eu consectetur ornare. Curabitur vestibulum</p>
                    <div className="text-gray-400 mt-2 text-sm">Anonymous &middot; a few seconds ago</div>
                </div>
            </div>
            <form>
                <textarea   
                        className="border rounded-md w-full" 
                        placeholder="Let us know what you think..." 
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                    <Button>Attach files</Button>
                    <Button primary disabled={commentText === ''}>Comment</Button>
                </div>
            </form>
        </div>
    );
}