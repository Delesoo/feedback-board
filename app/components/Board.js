import { useEffect, useRef, useState } from "react";
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
    const [votesLoading, setVotesLoading] = useState(false);
    const [votes, setVotes] = useState([]);
    const sortRef = useRef('votes');
    const lastId = useRef('');
    const [sort, setSort] = useState('votes');
    const {data:session} = useSession();
    useEffect(() => { 
      fetchFeedbacks();
    }, []);

    useEffect(() => {
      fetchVotes();
    }, [feedbacks])
    useEffect(() => {
      fetchFeedbacks();
    }, [sort]);
     useEffect(() => {
      if (session?.user?.email) {
        const feedbackToVote = localStorage.getItem('vote_after_login');
        if (feedbackToVote) {
          axios.post('/api/vote', {feedbackId: feedbackToVote}).then(() => {
            localStorage.removeItem('vote_after_login')
            fetchVotes();
          });
        }
        const feedbackToPost = localStorage.getItem('post_after_login');
        if (feedbackToPost) {
          const feedbackData = JSON.parse(feedbackToPost);
          axios.post('/api/feedback', feedbackData).then(async (res) => {
            await fetchFeedbacks(),
            setShowFeedbackPopupItem(res.data);
            localStorage.removeItem('post_after_login');
          });
        }
        const commentToPost = localStorage.getItem('comment_after_login');
        if (commentToPost) {
          const commentData = JSON.parse(commentToPost);
          axios.post('/api/comment', commentData).then(() => {
            axios.get('/api/feedback?id='+commentData.feedbackId).then(res => {
              setShowFeedbackPopupItem(res.data);
              localStorage.removeItem('comment_after_login');
            });
          });
        }
      }
    }, [session?.user?.email])
    function handleScroll() {
      const html = window.document.querySelector('html');
      const howMuchScrolled = html.scrollTop;
      const howMuchIsToScroll = html.scrollHeight;
      const leftToScroll = howMuchIsToScroll - howMuchScrolled - html.clientHeight;
      if (leftToScroll <= 100) {
        fetchFeedbacks(true);
      }
    }
    function registerScrollListener() {
      window.addEventListener('scroll', handleScroll);
    }
    function unregisterScrollListener() {
      window.removeEventListener('scroll', handleScroll);
    }
    useEffect(() => {
      registerScrollListener();
      return () => {unregisterScrollListener();}
    }, [])
    useEffect(() => {
      lastId.current='';
      sortRef.current = sort;
    }, [sort]); 
    async function fetchFeedbacks(append=false) {
      axios.get(`/api/feedback?sort=${sort}&lastId=${lastId.current}`).then(res => {
        if (append) {
          setFeedbacks(currentFeedbacks => [...currentFeedbacks, ...res.data]);
        } else {
          setFeedbacks(res.data);
        }
        lastId.current = res.data[res.data.length-1]._id;
      });
    }
    async function fetchVotes() {
      setVotesLoading(true);
      const ids = feedbacks.map(f => f._id)
      const res = await axios.get('/api/vote?feedbackIds='+ids.join(','));
      setVotes(res.data);
      setVotesLoading(false);
    }
    function openFeedbackPopupForm() {
      setShowFeedbackPopupForm(true);
    }
    function openFeedbackPopupItem(feedback) {
      setShowFeedbackPopupItem(feedback);
    }
    async function handleFeedbackUpdate(newData) {
      setShowFeedbackPopupItem(prevData => {
        return {...prevData, ...newData};
      });
      await fetchFeedbacks();
    }
    return (
        <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">

      <div className="bg-gradient-to-r from-red-400 to bg-orange-200 p-8">
        <h1 className="font-bold text-xl">Coding with Tornike</h1>
        <p className="text-opacity-90 text-slate-700">Help me decide what should I build for the next project</p>
      </div>
      <div className="bg-gray-100 px-8 py-4 flex border-b">
        <div className="grow flex items-center">
          <span className="text-gray-400 text-sm">Sort by: </span>
        <select
          value={sort}
          onChange={ev => {setSort(ev.target.value);}} 
          className="bg-transparent py-2 text-gray-600">
            <option value='votes'>Most Voted</option>
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
        <div>
          <Button primary onClick={openFeedbackPopupForm}>Make a suggestion</Button>
        </div>
      </div>
      <div className="px-8">
        {feedbacks.map(feedback => (
          <FeedbackItem {...feedback} 
                        onVotesChange={fetchVotes} 
                        votes={votes.filter(v => v.feedbackId.toString() === feedback._id.toString())}
                        parentLoadingVotes={votesLoading} 
                        onOpen={() => openFeedbackPopupItem(feedback)} />
        ))}
      </div>
      {showFeedbackPopupForm && (
        <FeedbackFormPopup onCreate={fetchFeedbacks} setShow={setShowFeedbackPopupForm} />
      )}
      {showFeedbackPopupItem && (
        <FeedbackItemPopup {...showFeedbackPopupItem} 
                          votes={votes.filter(v => v.feedbackId.toString() === showFeedbackPopupItem._id)} 
                          onVotesChange={fetchVotes}
                          onUpdate={handleFeedbackUpdate}
                          setShow={setShowFeedbackPopupItem} />
      )}
    </main>
    );
}