import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import axios from "axios";

export default function FeedbackFormPopup({setShow}) {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  function handleCreatePostButtonClick(ev) {
    ev.preventDefault();
    axios.post('/api/feedback', {title, description})
    .then(() => {
    setShow(false);  
  });
  }
    return (
        <Popup setShow={setShow} title={'Make a suggestion'}>
            <form className="p-8">
                <label className="block mt-4 mb-1 text-slate-700">Title</label>
                <input className="w-full border p-2 rounded-md" type="text" 
                       placeholder="A short, descriptive title"
                       value={title}
                       onChange={ev => setTitle(ev.target.value)}
                />
                <label className="block mt-4 mb-1 text-slate-700">Details</label>
                <textarea 
                      className="w-full border p-2 rounded-md" 
                      placeholder="Please include any details"
                      onChange={ev => setDescription(ev.target.value)}
                      value={description}
                      />
              <div className="flex gap-2 mt-2 justify-end">
                <Button>Attach files</Button>
                <Button primary onClick={handleCreatePostButtonClick}>Create a post</Button>
              </div>
            </form>
        </Popup>
    );
}