import { useState } from "react";
import Button from "./Button";
import FeedbackItemPopupComments from "./FeedbackItemPopupComments";
import Popup from "./Popup";
import axios from "axios";
import { MoonLoader } from "react-spinners";

export default function FeedbackItemPopup({_id, title, description, setShow, votes, onVotesChange}) {
    const [isVotesLoading, setIsVotesLoading] = useState(false);
    function handleVoteButtonClick() {
        setIsVotesLoading(true);
        axios.post('/api/vote', {feedbackId: _id}).then(async () => {
            await onVotesChange();
            setIsVotesLoading(false);
        });
    }
    return (
        <Popup title={''} setShow={setShow}> 
            <div className="p-8 pb-2">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-gray-600">
                    {description}
                </p>
            </div>
            <div className="flex justify-end px-4 py-2 border-b">
                <Button primary onClick={handleVoteButtonClick}>
                    {isVotesLoading && (
                        <MoonLoader size={18} />
                    )}
                    {!isVotesLoading && (
                        <>
                            <span className="triangle-vote-up"></span>
                            Upvote {votes?.length || '0'}
                        </>
                    )}
                </Button>
            </div>
            <div>
                <FeedbackItemPopupComments />
            </div>
        </Popup>
    );
}