import Paperclip from "./icons/Paperclip";
import Trash from "./icons/Trash";

export default function Attachment({link,showRemoveButton=false,handleRemoveFileButtonClick}) {
    return (
        <a href={link} target="_blank" className="h-16 relative">
            {showRemoveButton && (
              <button onClick={ev => handleRemoveFileButtonClick(ev,link)} className="-right-2 -top-2 absolute bg-red-300 p-1 rounded-md">
              <Trash />
            </button>
            )}
        {/.(jpg|png)$/.test(link) ? (
          <img className="h-16 w-auto rounded-md" src={link} alt=""></img>
        ) : (
          <div className="bg-gray-200 h-16 p-2 flex items-center rounded-md">
            <Paperclip className="w-4 h-4" />
            {link.split('/')[3].substring(13)}
          </div>
        )}
      </a>
    )
}