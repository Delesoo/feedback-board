
export default function Home() {
  return (
    <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      <div className="bg-gradient-to-r from-red-400 to bg-orange-200 p-8">
        <h1 className="font-bold text-xl">Coding with Tornike</h1>
        <p className="text-opacity-90 text-slate-700">Help me decide what should I build for the next project</p>
      </div>
      <div className="bg-gray-100 px-8 py-2 flex border-b">
        <div className="grow"></div>
        <div>
          <button className="bg-red-500 py-1 px-4 rounded-md text-white text-opacity-90">Make a suggestion</button>
        </div>
      </div>
      <div className="px-8 py-4">
        <div className="flex gap-8 items-center">
          <div>
            <h2>Lorem ipsum</h2>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus mollis justo, ac placerat lorem bibendum ac. Sed dignissim nunc eu consectetur ornare. Curabitur vestibulum</p>
          </div>
          <div>
            <button className="shadow-sm shadow-gray-200 border rounded-md py-1 px-4">^80</button>
          </div>
        </div>
      </div>
    </main>
  );
}
