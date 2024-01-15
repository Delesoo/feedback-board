export default function FeedbackItem({onOpen,title,description,votesCount}) {

    return (
        <a  href="" 
            onClick={e => {e.preventDefault();onOpen();}} 
            className="my-8 flex gap-8 items-center">
          <div>
            <h2 className="font-bold">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div>
          <button className="shadow-sm shadow-gray-200 border rounded-md py-1 px-2 flex items-center gap-1 text-gray-600">
            <span className="triangle-vote-up"></span>
            {votesCount}
          </button>
        </div>
      </a>
    );
}