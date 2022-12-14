import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [image, setImage] = useState("");
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const gifts = localStorage.getItem("gifts");
    if (gifts) {
      setGifts(JSON.parse(gifts));
    }
  }, []);

  const handleAddGift = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "gifts",
      JSON.stringify([...gifts, { name: value, quantity, image }])
    );
    setGifts([...gifts, { name: value, quantity, image }]);
    setValue("");
    setQuantity("");
    setImage("");
  };

  const removeAll = () => {
    localStorage.clear();
    setGifts([]);
  };

  const handleDeleteGift = (index) => {
    const newGifts = gifts.filter((gift, i) => i !== index);
    localStorage.setItem("gifts", JSON.stringify(newGifts));
    setGifts(newGifts);
  };

  return (
    <main className="flex flex-col h-screen justify-center items-center align-center bg-[url('../public/christmas.png')] font-mono text-white">
      <article className="bg-green-600 space-y-5 p-5 border-2 border-white rounded-xl">
        <h1 className="font-sans text-5xl text-center">Adviency Día 10</h1>
        <form
          className="flex flex-col space-y-2"
          action="submit"
          onSubmit={handleAddGift}
        >
          <input
            className="p-1 rounded-md text-black"
            type="text"
            placeholder="Medias"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <input
            className="p-1 rounded-md text-black"
            type="number"
            placeholder="2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            className="p-1 rounded-md text-black"
            type="text"
            placeholder="https://image.."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-500 border rounded-md p-1 font-white"
          >
            Agregar
          </button>
        </form>
        <ul className="space-y-2">
          {!gifts?.length ? (
            <li className="text-center">No hay regalos</li>
          ) : (
            gifts?.map((gift, index) => (
              <li key={index} className="flex justify-between">
                <img
                  className="w-10 h-10"
                  width={20}
                  height={20}
                  src={
                    gift.image ? gift.image : "https://via.placeholder.com/150"
                  }
                  alt={gift.name}
                />
                <p>{gift.name}</p>
                <p>x{gift.quantity}</p>
                <button
                  onClick={() => handleDeleteGift(index)}
                  className="bg-red-500 border rounded-md p-1 font-white"
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
        <button
          type="button"
          onClick={removeAll}
          className="bg-red-500 border rounded-md p-1 font-white"
        >
          Eliminar todo
        </button>
      </article>
    </main>
  );
}
