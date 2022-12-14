import { useState } from "react";

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const [input, setInput] = useState("");

  const addGifts = () => {
    setGifts([...gifts, input]);
    setInput("");
  };
  const handleAddGifts = (e) => {
    e.preventDefault();
    addGifts();
  };

  const removeGifts = (index) => {
    const newGifts = [...gifts];
    newGifts.splice(index, 1);
    setGifts(newGifts);
  };

  return (
    <div className="flex flex-col h-screen align-center items-center justify-center text-white bg-[url('../public/christmas.png')] font-mono ">
      <div className="space-y-6 flex flex-col justify-center border-2 rounded-xl items-center p-6 bg-green-600">
        <h1 className="font-sans text-4xl">Adviency Dia 4</h1>
        <form action="submit" onSubmit={handleAddGifts} className="space-x-1">
          <input
            className="p-2 text-black bg-white border shadow-sm border-red-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-2"
            type="text"
            placeholder="Escribe tu regalo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="p-2 text-white bg-red-600 border shadow-sm border-red-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-2"
            type="submit"
          >
            AGREGAR
          </button>
        </form>
        <ul className="flex flex-col w-full gap-2">
          {gifts.map((gift, index) => (
            <div key={index} className="flex justify-between">
              <li key={index}>🎄 {gift}</li>
              <button
                className="bg-red-500 py px-2 border-white border"
                onClick={() => removeGifts(index)}
              >
                X
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
