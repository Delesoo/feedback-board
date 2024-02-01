import { useEffect, useState } from "react";
import FeedbackItem from "@/app/components/FeedbackItem";
import FeedbackFormPopup from "@/app/components/FeedbackFormPopup";
import Button from "@/app/components/Button";
import FeedbackItemPopup from "@/app/components/FeedbackItemPopup";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

export default function Board() {
    const [showFeedbackPopupForm,setShowFeedbackPopupForm] = useState(false);
    const [showFeedbackPopupItem,setShowFeedbackPopupItem] = useState (null);
    const [feedbacks, setFeedbacks] = useState([]);
    const {data:session} = useSession();
    useEffect(() => { 
      axios.get('/api/feedback').then(res => {
        setFeedbacks(res.data);
      })
    }, []);
     useEffect(() => {
      if (session?.user?.email) {
        const feedbackId = localStorage.getItem('vote_after_login');
        if (feedbackId) {
          alert(feedbackId);
          axios.post('/api/vote', {feedbackId});
        }
      }
    }, [session?.user?.email])
    function openFeedbackPopupForm() {
      setShowFeedbackPopupForm(true);
    }
    function openFeedbackPopupItem(feedback) {
      setShowFeedbackPopupItem(feedback);
    }
    return (
        <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
        {session?.user?.email || 'not logged in'}
      <div className="bg-gradient-to-r from-red-400 to bg-orange-200 p-8">
        <h1 className="font-bold text-xl">Coding with Tornike</h1>
        <p className="text-opacity-90 text-slate-700">Help me decide what should I build for the next project</p>
      </div>
      <div className="bg-gray-100 px-8 py-4 flex border-b">
        <div className="grow"></div>
        <div>
          <Button primary onClick={openFeedbackPopupForm}>Make a suggestion</Button>
        </div>
      </div>
      <div className="px-8">
        {feedbacks.map(feedback => (
          <FeedbackItem {...feedback} onOpen={() => openFeedbackPopupItem(feedback)} />
        ))}
      </div>
      {showFeedbackPopupForm && (
        <FeedbackFormPopup setShow={setShowFeedbackPopupForm} />
      )}
      {showFeedbackPopupItem && (
        <FeedbackItemPopup {...showFeedbackPopupItem} setShow={setShowFeedbackPopupItem} />
      )}
    </main>
    );
}