import { useState, useEffect } from "react";
import GiftModal from "../components/modal.js";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ApiError } from "next/dist/server/api-utils/index.js";

export const api = {
  gifts: {
    get: async () => {
      const response = await fetch("/api/gifts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new ApiError(response.status, response.statusText);
      }
    },
  },
};

export default function Home() {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [gifts, setGifts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [to, setTo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(0);

  const handleAddGift = (e) => {
    e.preventDefault();
    addGift();
    setIsOpen(false);
    setIsEditing(false);
    setValue("");
    setQuantity(1);
    setPrice(0);
    setImage("");
    setTo("");
  };

  const addGift = () => {
    const newGift = {
      name: value,
      quantity: quantity,
      image: image,
      price: price,
      to: to,
    };
    const newGifts = [...gifts, newGift];
    localStorage.setItem("gifts", JSON.stringify(newGifts));
    setGifts(newGifts);
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEditGift = (index) => {
    setIsEditing(true);
    setIsOpen(true);
    setValue(gifts[index].name);
    setQuantity(gifts[index].quantity);
    setImage(gifts[index].image);
    setPrice(gifts[index].price);
    setTo(gifts[index].to);
    const newGifts = gifts.filter((gift, i) => i !== index);
    localStorage.setItem("gifts", JSON.stringify(newGifts));
    setGifts(newGifts);
    setIsEditing(false);
  };

  useEffect(() => {
    api.gifts.get().then((gifts) => {
      const previousGifts = localStorage.getItem("gifts");
      if (previousGifts) {
        setGifts(JSON.parse(previousGifts));
      } else {
        setGifts(gifts);
        localStorage.setItem("gifts", JSON.stringify(gifts));
      }
    });
  }, []);

  return (
    <main className="flex flex-col h-screen justify-center items-center align-center bg-[url('../public/christmas.png')] font-mono text-white">
      {isOpen && (
        <GiftModal
          handleModal={handleModal}
          value={value}
          setValue={setValue}
          quantity={quantity}
          setQuantity={setQuantity}
          image={image}
          setImage={setImage}
          handleAddGift={handleAddGift}
          gift={gifts}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          to={to}
          setTo={setTo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setPrice={setPrice}
          price={price}
        />
      )}

      <article className="bg-green-600 space-y-4 p-6 border-2 border-white rounded-lg w-1/3">
        <h1 className="font-sans text-5xl text-center">Adviency Día 18</h1>
        <button
          type="button"
          onClick={handleModal}
          className="bg-green-500 border rounded-md p-1 font-white w-full"
        >
          Agregar regalo
        </button>
        <div className="space-y-2">
          {!gifts?.length ? (
            <p className="text-center">No hay regalos :( </p>
          ) : (
            gifts.map((gift, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <img
                  className="w-10 h-10"
                  width={20}
                  height={20}
                  src={
                    gift.image
                      ? gift.image
                      : "https://img.freepik.com/free-vector/vector-striped-red-white-christmas-candy-cane-close-up-top-view-isolated-background_1284-47922.jpg?w=1380&t=st=1670770826~exp=1670771426~hmac=90f9ff9c732f2e072b49d2e06862ae96bb65e1fbe6422da6c43050b247fc4bde"
                  }
                  alt={gift.name}
                />
                <div className="flex-1 pl-2">
                  <p className="text-sm">
                    🎄 {gift.name} ({gift.quantity}) - $
                    {(gift.price * gift.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs font-thin text-gray-200">
                    🎅🏻 {gift.to}
                  </p>
                </div>
                <div className="space-x-1 ml-1">
                  <button
                    onClick={() => handleEditGift(index)}
                    className="bg-red-500 border rounded-md p-1 font-white"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteGift(index)}
                    className="bg-red-500 border rounded-md p-1 font-white"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {gifts?.length > 0 && (
          <div>
            <div className="border-b"></div>
            <p className="text-center py-2 font-semibold">
              Total: $
              {gifts.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
            </p>
            <button
              type="button"
              onClick={removeAll}
              className="bg-red-500 border rounded-md p-1 font-white w-full"
            >
              Eliminar todo
            </button>
          </div>
        )}
      </article>
    </main>
  );
}
