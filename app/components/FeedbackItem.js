'use client';
import { useState } from "react";
import Popup from "./Popup";
import Button from "./Button";
import {signIn, useSession} from 'next-auth/react';
import axios from "axios";
import { MoonLoader } from "react-spinners";

export default function FeedbackItem({onOpen, _id, title, description, votes, onVotesChange, parentLoadingVotes=true}) {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isVotesLoading, setIsVotesLoading] = useState(false);
    const {data:session} = useSession();
    const isLoggedIn = !!session?.user?.email;
    function handleVoteButtonClick(ev){
      ev.stopPropagation();
      ev.preventDefault();
      if (!isLoggedIn) {
        localStorage.setItem('vote_after_login', _id );
        setShowLoginPopup(true);
      } else {
        setIsVotesLoading(true);
        axios.post('/api/vote', {feedbackId: _id,}).then(async () => {
          await onVotesChange();
          setIsVotesLoading(false);
        });
      }
    }
    async function handleGoogleLoginButtonClick(ev) {
      ev.stopPropagation();
      ev.preventDefault();    
      await signIn('google');
    }
    const iVoted = !!votes.find(v => v.userEmail === session?.user?.email);
    const shortDesc = description.substring(0, 200);
    return (
        <a  href="" 
            onClick={e => {e.preventDefault();onOpen();}} 
            className="my-8 flex gap-8 items-center">
          <div className="flex-grow">
            <h2 className="font-bold">{title}</h2>
            <p className="text-gray-600 text-sm">{shortDesc} {shortDesc.length < description.length ? '...' : ''} </p>
        </div>
        <div>
          {showLoginPopup && (
            <Popup title={'Confirm your vote!'} narrow setShow={setShowLoginPopup}> 
              <div className="p-4">
                <Button primary onClick={handleGoogleLoginButtonClick}>login with google</Button> 
              </div>
            </Popup>
          )}
             <Button primary={iVoted} onClick={handleVoteButtonClick} className="shadow-sm border">
             {!isVotesLoading && (
               <>
               <span className="triangle-vote-up"></span>
               {votes?.length || '0'}
               </>
             )}
             {isVotesLoading && (
               <MoonLoader size={18} />
             )}
            </Button>
        </div>
      </a>
    );
}