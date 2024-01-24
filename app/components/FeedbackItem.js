import { useState } from "react";
import Popup from "./Popup";

export default function FeedbackItem({onOpen,title,description,votesCount}) {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    function handleVoteButtonClick(ev){
      ev.stopPropagation();
      ev.preventDefault();
      setShowLoginPopup(true);
    }
    const isLoggedIn = false;
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
                login button 
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