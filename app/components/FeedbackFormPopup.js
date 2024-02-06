import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import axios from "axios";
import Paperclip from "./icons/Paperclip";
import Trash from "./icons/Trash";
import {MoonLoader} from 'react-spinners';
import Attachment from "./Attachment";

export default function FeedbackFormPopup({setShow, onCreate}) {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  function handleCreatePostButtonClick(ev) {
    ev.preventDefault();
    axios.post('/api/feedback', {title, description, uploads})
    .then(() => {
    setShow(false); 
      onCreate();
  });
  }
  async function handleAttachFilesInputChange(ev) {
    const files = [...ev.target.files];
    setIsUploading(true);
    const data = new FormData();
    for (const file of files) {
      data.append('file', file);
    }
    const res = await axios.post('/api/upload', data);
    setUploads((existingUpload) => {
      return [...existingUpload, ...res.data]
    });
    setIsUploading(false);
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
                  <Attachment link={link}
                              showRemoveButton={true} 
                              handleRemoveFileButtonClick={(ev, link) => 
                              handleRemoveFileButtonClick(ev, link)} />
                ))}
              </div>
                </div>
              )}

              <div className="flex gap-2 mt-2 justify-end">
                <label className={"flex gap-2 py-2 px-4 text-gray-600 cursor-pointer"}>
                  {isUploading && (
                    <MoonLoader size={18} />
                  )}
                  <span className={(isUploading ? 'text-gray-300' : '')}>{isUploading ? 'Uploading...' : 'Attach files'}</span>
                  <input multiple onChange={handleAttachFilesInputChange} type="file" className="hidden"></input>
                </label>
                <Button primary onClick={handleCreatePostButtonClick}>Create a post</Button>
              </div>
            </form>
        </Popup>
    );
}