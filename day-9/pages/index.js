import { useEffect, useState } from "react";
export default function Home() {
  const [value, setValue] = useState("");
  const [gifts, setGifts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getGifts = () => {
    return new Promise((res, rej) => {
      const data = JSON.parse(window.localStorage.getItem("gifts")) || [];

      setTimeout(() => {
        res(data);
      }, 1700);
    });
  };

  useEffect(() => {
    getGifts().then((gifts) => {
      setGifts(gifts);
    });
  }, []);

  const handleAddGift = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "gifts",
      JSON.stringify([...gifts, { value, quantity }])
    );
    setGifts([...gifts, { value, quantity }]);
    setValue("");
    setQuantity(1);
  };

  const handleDeleteGift = (index) => {
    const newGifts = [...gifts];
    newGifts.splice(index, 1);
    setGifts(newGifts);
  };

  const removeAll = () => {
    setGifts([]);
  };

  useEffect(() => {
    const gifts = localStorage.getItem("gifts");
    if (gifts) {
      setGifts(JSON.parse(gifts));
    }
  }, []);

  return (
    <main className="flex flex-col h-screen justify-center items-center align-center bg-[url('../public/christmas.png')] font-mono text-white">
      <article className="bg-green-600 space-y-5 p-5 border-2 border-white rounded-xl">
        <h1 className="font-sans text-4xl text-center">Adviency Día 9</h1>
        <form action="submit" onSubmit={handleAddGift} className="space-x-2">
          <input
            className="p-1 rounded-md text-black"
            type="text"
            placeholder="Regalos"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <input
            className="p-1 rounded-md text-black w-10"
            type="number"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
          <button
            type="submit"
            className="bg-red-500 border rounded-md p-1 font-white"
          >
            Agregar
          </button>
        </form>
        <ul>
          {!gifts?.length ? (
            <li className="text-center">No hay regalos</li>
          ) : (
            gifts?.map((gift, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 rounded-md"
              >
                🎄 {gift.value} ({gift.quantity})
                <button
                  onClick={() => handleDeleteGift(index)}
                  className="bg-red-500 rounded-md px-2 font-white"
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
          Eliminar todo
        </button>
      </article>
    </main>
  );
}
