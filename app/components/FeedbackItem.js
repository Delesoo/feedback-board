export default function FeedbackItem() {
    return (
        <div className="my-8 flex gap-8 items-center">
        <div>
          <h2 className="font-bold">Lorem ipsum</h2>
          <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus mollis justo, ac placerat lorem bibendum ac. Sed dignissim nunc eu consectetur ornare. Curabitur vestibulum</p>
        </div>
        <div>
          <button className="shadow-sm shadow-gray-200 border rounded-md py-1 px-2 flex items-center gap-1 text-gray-600">
            <span className="triangle-vote-up"></span>
            80
          </button>
        </div>
      </div>
    );
}