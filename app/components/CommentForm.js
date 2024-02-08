import AttachFilesButton from "./AttachFilesButton";
import Attachment from "./Attachment";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

export default function CommentForm({feedbackId, OnPost}) {
    const [commentText, setCommentText] = useState('');
    const [uploads, setUploads] = useState([]);
    function addUploads(newLinks) {
        setUploads(prevLinks => [...prevLinks, ...newLinks]);
    }
    function removeUpload(ev, linkToRemove) {
        ev.preventDefault();
        ev.stopPropagation();
        setUploads(prevLinks => prevLinks.filter(link => link !== linkToRemove));
    }
    async function handleCommentButtonClick(ev) {
        ev.preventDefault();
        await axios.post('/api/comment', {
            text: commentText,
            uploads,
            feedbackId, 
        });
        setCommentText('');
        setUploads([]);
        onPost();
    }
    return (
        <form>
        <textarea   
                className="border rounded-md w-full" 
                placeholder="Let us know what you think..." 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
        />
        {uploads?.length > 0 && (
            <div className="">
                <div className="text-sm text-gray-600 mt-2">Files</div>
                <div className="flex gap-3">
                    {uploads.map(link => (
                        <div>
                            <Attachment link={link} 
                                        showRemoveButton={true} 
                                        handleRemoveFileButtonClick={(ev, link) => removeUpload(ev, link)} />
                        </div>
                    ))}    
                </div>
            </div>
        )}
        <div className="flex justify-end gap-2 mt-2">
            <AttachFilesButton onNewFiles={addUploads} />
            <Button onClick={handleCommentButtonClick} primary disabled={commentText === ''}>Comment</Button>
        </div>
    </form>
    )
}