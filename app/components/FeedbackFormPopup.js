import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import axios from "axios";
import Paperclip from "./icons/Paperclip";
import Trash from "./icons/Trash";

export default function FeedbackFormPopup({setShow}) {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [uploads, setUploads] = useState([]);
  function handleCreatePostButtonClick(ev) {
    ev.preventDefault();
    axios.post('/api/feedback', {title, description})
    .then(() => {
    setShow(false);  
  });
  }
  async function handleAttachFilesInputChange(ev) {
    const files = [...ev.target.files];
    const data = new FormData();
    for (const file of files) {
      data.append('file', file);
    }
    const res = await axios.post('/api/upload', data);
    setUploads((existingUpload) => {
      return [...existingUpload, ...res.data]
    });
  }
  function handleRemoveFileButtonClick(ev, link) {
    ev.preventDefault();
    setUploads(currentUpload => {
      return currentUpload.filter(val => val !== link);
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
              {uploads?.length > 0 && (
                <div>
                <label className="block mt-2 mb-1 text-slate-700">Attachments</label>
                  <div className="flex gap-3">
                {uploads.map(link => (
                  <a href={link} target="_blank" className="h-16 relative">
                    <button onClick={ev => handleRemoveFileButtonClick(ev,link)} className="-right-2 -top-2 absolute bg-red-300 p-1 rounded-md">
                      <Trash />
                    </button>
                    {/.(jpg|png)$/.test(link) ? (
                      <img className="h-16 w-auto rounded-md" src={link} alt=""></img>
                    ) : (
                      <div className="bg-gray-200 h-16 p-2 flex items-center rounded-md">
                        <Paperclip className="w-4 h-4" />
                        {link.split('/')[3].substring(13)}
                      </div>
                    )}
                  </a>
                ))}
              </div>
                </div>
              
              )}

              <div className="flex gap-2 mt-2 justify-end">
                <label className="py-2 px-4 text-gray-600 cursor-pointer">
                  <span>Attach files</span>
                  <input multiple onChange={handleAttachFilesInputChange} type="file" className="hidden"></input>
                </label>
                <Button primary onClick={handleCreatePostButtonClick}>Create a post</Button>
              </div>
            </form>
        </Popup>
    );
}