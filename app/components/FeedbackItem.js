'use client';
import { useState } from "react";
import Popup from "./Popup";
import Button from "./Button";
import {signIn} from 'next-auth/react';

export default function FeedbackItem({onOpen, _id, title,description,votesCount}) {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isLoggedIn = false;
    function handleVoteButtonClick(ev){
      ev.stopPropagation();
      ev.preventDefault();
      if (!isLoggedIn) {
        localStorage.setItem('vote_after_login', _id );
        setShowLoginPopup(true);
      }
    }
    async function handleGoogleLoginButtonClick(ev) {
      ev.stopPropagation();
      ev.preventDefault();    
      await signIn('google');
    }
    return (
        <a  href="" 
            onClick={e => {e.preventDefault();onOpen();}} 
            className="my-8 flex gap-8 items-center">
          <div className="flex-grow">
            <h2 className="font-bold">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div>
          {showLoginPopup && (
            <Popup title={'Confirm your vote!'} narrow setShow={setShowLoginPopup}> 
              <div className="p-4">
                <Button primary onClick={handleGoogleLoginButtonClick}>login with google</Button> 
              </div>
            </Popup>
          )}
          <button onClick={handleVoteButtonClick} className="shadow-sm shadow-gray-200 border rounded-md py-1 px-2 flex items-center gap-1 text-gray-600">
            <span className="triangle-vote-up"></span>
            {votesCount || '0'}
          </button>
        </div>
      </a>
    );
}