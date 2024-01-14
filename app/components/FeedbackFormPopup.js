import Button from "./Button";

export default function FeedbackFormPopup({setShow}) {
    return (
        <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex md:items-center">
            <button onClick={() => setShow(false)} className="hidden md:block fixed top-4 right-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18    0Z" />
                </svg>
            </button>
            <div className="w-full">
                <div className="bg-white md:max-w-2xl md:mx-auto md:rounded-lg overflow-hidden">
                    <div className="relative">
                        <button onClick={() => setShow(false)} className="md:hidden absolute top-4 left-8 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor"     className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h2 className="py-4 text-center border-b">
                        Make a suggestion
                        </h2>
                    </div>
                    <form className="p-8">
                        <label className="block mt-4 mb-1 text-slate-700">Title</label>
                        <input className="w-full border p-2 rounded-md" type="text" placeholder="A short, descriptive title"></input>
                        <label className="block mt-4 mb-1 text-slate-700">Details</label>
                        <textarea className="w-full border p-2 rounded-md" placeholder="Please include any details"></textarea>
                        <div className="flex gap-2 mt-2 justify-end">
                            <Button>Attach files</Button>
                            <Button primary>Create a post</Button>
                        </div>
                    </form>
                </div>  
            </div>     
        </div>
    );
}