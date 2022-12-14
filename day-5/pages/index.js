import { useState } from "react";

export default function Home() {
  const [gift, setGift] = useState([]);
  const [input, setInput] = useState("");

  const addGift = (e) => {
    e.preventDefault();
    setGift([...gift, input]);
    setInput("");
  };

  const handleAddGift = (e) => {
    if (input !== "") {
      addGift(e);
    } else {
      alert("Debes escribir un regalo");
      setInput("");
    }
  };

  const removeGift = (index) => {
    const newGift = [...gift];
    newGift.splice(index, 1);
    setGift(newGift);
  };

  const removeAll = () => {
    setGift([]);
  };

  return (
    <main className="flex flex-col h-screen justify-center items-center align-center bg-[url('../public/christmas.png')] font-mono text-white">
      <section className="bg-green-600 border-2 border-white rounded-xl p-4 space-y-2">
        <h1 className="font-sans text-5xl text-center font-bold p-2">
          Adviency Día 5
        </h1>
        <form className="space-x-2" action="submit" onSubmit={handleAddGift}>
          <label htmlFor="gift">
            <input
              className="p-1 text-black bg-white border shadow-sm border-red-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-6"
              type="text"
              placeholder="Escribe tu regalo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button
            className="bg-red-500 border rounded-md p-1 font-white"
            type="submit"
          >
            AGREGAR
          </button>
        </form>
        <ul className="space-y-1">
          {gift.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 rounded-md"
            >
              <span>🎄 {item}</span>
              <button
                className="bg-red-500 rounded-md px-2 font-white"
                onClick={() => removeGift(index)}
              >
                X
              </button>
            </li>
          ))}
          <button
            className="bg-red-500 border w-full rounded-md p-1 font-white"
            onClick={removeAll}
          >
            ELIMINAR TODO
          </button>
        </ul>
      </section>
    </main>
  );
}
