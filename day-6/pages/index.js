import { useState } from "react";

export default function Home() {
  const [gift, setGift] = useState([]);
  const [value, setValue] = useState("");

  const addGift = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    setGift([...gift, value]);
    setValue("");
  };

  const handleAddGift = (e) => {
    addGift(e);
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
      <article className="bg-green-600 space-y-4 p-4 border-2 border-white rounded-xl">
        <h1 className="font-sans text-5xl text-center">Adviency Dia 6</h1>
        <form onSubmit={handleAddGift} action="submit" className="space-x-2">
          <input
            className="p-1 rounded-md text-black"
            type="text"
            placeholder="Escribe tu regalo"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-red-500 border rounded-md p-1 font-white"
            type="submit"
          >
            Agregar
          </button>
        </form>
        <ul>
          {!gift.length ? (
            <p className="text-center ">Agregate algo Grinch!</p>
          ) : (
            gift.map((item, index) => (
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
            ))
          )}
        </ul>
        <button
          type="button"
          onClick={removeAll}
          className="bg-red-500 border w-full rounded-md p-1 font-white"
        >
          Eliminar todos
        </button>
      </article>
    </main>
  );
}
