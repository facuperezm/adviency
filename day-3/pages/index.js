import { useState } from "react";

export default function Home() {
  const [gift, setGift] = useState([]);
  const [input, setInput] = useState("");

  const addGift = () => {
    setGift([...gift, input]);
    setInput("");
  };

  const handleAddGift = (e) => {
    e.preventDefault();
    addGift();
  };

  return (
    <div className="flex flex-col text-white justify-center align-center items-center bg-[url('../public/christmas.png')] h-screen font-mono">
      <div className="flex flex-col justify-center border-2 rounded-xl items-center p-6 bg-green-600">
        <h1 className="font-sans text-4xl font-bold">Adviency Día 3</h1>
        <div className="">
          <form
            className="space-x-2 mt-4"
            action="submit"
            onSubmit={handleAddGift}
          >
            <input
              className="p-2 text-black bg-white border shadow-sm border-red-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-2"
              type="text"
              placeholder="Escribe tu regalo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="rounded-md bg-red-700 border-white border p-2"
              type="submit"
            >
              Agregar
            </button>
          </form>
          <ul className="text-left flex flex-col px-4 pt-4">
            {gift?.map((gift, index) => (
              <li key={index}>🎄 {gift}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
