import { useEffect, useState } from "react";
import Button from "./Button";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import axios from "axios";
import Attachment from "./Attachment";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import AttachFilesButton from "./AttachFilesButton";

export default function FeedbackItemPopupComments({feedbackId}) {
    const [comments, setComments] = useState([]);
    const {data: session} = useSession();
    const [editingComment, setEditingComment] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [newCommentUploads, setNewCommentUploads] = useState([]);
    useEffect(() => {
        fetchComments();
    }, []);
    function fetchComments() {
        axios.get('/api/comment?feedbackId='+feedbackId).then(res => {
            setComments(res.data);
        });
    }
    function handleEditButtonClick(comment) {
        setEditingComment(comment);
        setNewCommentText(comment.text);
        setNewCommentUploads(comment.uploads);
    }
    function    handleCancelButtonClick() {
        setNewCommentText('');
        setNewCommentUploads([]);
        setEditingComment(null);
    }
    function handleRemoveFileButtonClick(ev, linkToRemove) {
        ev.preventDefault();
        setNewCommentUploads(prev => prev.filter(l => l!==linkToRemove));
    }
    function handleNewLinks(newLinks) {
        setNewCommentUploads(currentLinks => [...currentLinks, ...newLinks]);
    }
    async function handleSaveChangesButtonClick() {
        const newData = {text: newCommentText, uploads: newCommentUploads}
        await axios.put('/api/comment', {id: editingComment._id, ...newData});
        setComments(existingComments => {
            return existingComments.map(comment => {
                if (comment._id === editingComment._id) {
                    return {...comment, ...newData};
                } else {
                    return comment;
                }
            });
        });
        setEditingComment(null);

    }
    return (
        <div className="p-8">
            {comments?.length > 0 && comments.map(comment => {
                const editingThis = editingComment?._id === comment._id;
                const isAuthor = !!comment.user.email && comment.user.email === session?.user?.email;
                return (
                <div className="mb-8">
                    <div className="flex gap-4">
                    <Avatar url={comment.user.image} />
                        <div>
                            {editingThis && (
                                <textarea
                                    value={newCommentText}
                                    onChange={ev => setNewCommentText(ev.target.value)}
                                    className="border p-2 block w-full" />
                            )}
                            {!editingThis && (
                                <p className="text-gray-600">{comment.text}</p>
                            )}
                            <div className="text-gray-400 mt-2 text-sm">
                                {comment.user.name} &nbsp;&middot;&nbsp; 
                            <TimeAgo
                                datetime={comment.createdAt}
                                locale='en_US'
                            />
                            {!editingThis && isAuthor && (
                                <>
                                    &nbsp;&middot;&nbsp;
                                    <span 
                                        onClick={() => handleEditButtonClick(comment)}
                                        className="cursor-pointer hover:underline">
                                        Edit
                                    </span>
                                </>
                            )}
                            {editingThis&& (
                                <>
                                    &nbsp;&middot;&nbsp;
                                    <span onClick={handleCancelButtonClick} className="cursor-pointer hover:underline text-black">Cancel</span>
                                    &nbsp;&middot;&nbsp;
                                    <span onClick={handleSaveChangesButtonClick} className="cursor-pointer hover:underline text-black">Save</span>
                                </>
                            )}
                            </div>
                            {(editingThis ? newCommentUploads : comment.uploads)?.length > 0 && (
                            <div className="flex gap-2 mt-3">
                                {(editingThis ? newCommentUploads : comment.uploads).map
                                (link => (
                                    <Attachment 
                                        handleRemoveFileButtonClick={handleRemoveFileButtonClick}
                                        showRemoveButton={editingComment?._id === comment._id} 
                                        link={link} />
                                ))}
                            </div>
                        )}
                        {editingThis && (
                            <div className="mt-2">
                                <AttachFilesButton onNewFiles={handleNewLinks}/>
                            </div>
                        )}
                        </div>
                    </div>
                </div> 
                );
            })}
            {!editingComment && (
                <CommentForm feedbackId={feedbackId} OnPost={fetchComments} />
            )}
        </div>
    );
}