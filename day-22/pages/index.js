import { useState, useEffect } from "react";
import GiftModal from "../components/modal.js";
import { AiFillEdit, AiFillDelete, AiFillGift } from "react-icons/ai";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { ApiError } from "next/dist/server/api-utils/index.js";
import ModalPreview from "../components/modalPreview.js";
import Link from "next/link.js";

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
  const [index, setIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAddGift = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the gift in the gifts array
      const editedGift = {
        name: value,
        quantity: quantity,
        image: image,
        price: price,
        to: to,
      };
      const newGifts = [
        ...gifts.slice(0, index),
        editedGift,
        ...gifts.slice(index + 1),
      ];
      localStorage.setItem("gifts", JSON.stringify(newGifts));
      setGifts(newGifts);
    } else {
      // Add a new gift to the gifts array
      addGift();
    }
    setIsOpen(false);
    setIsEditing(false);
    setValue("");
    setQuantity(null);
    setPrice(null);
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
    setIndex(index); // Set the index of the gift being edited
  };

  const handleOpenDuplicate = (index) => {
    setIsOpen(true);
    setValue(gifts[index].name);
    setQuantity(gifts[index].quantity);
    setImage(gifts[index].image);
    setPrice(gifts[index].price);
    setTo(gifts[index].to);
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

  const handleOpenPreview = () => {
    setIsPreview(!isPreview);
  };

  const handleAudio = () => {
    const audio = document.querySelector("audio");
    if (audio.paused) {
      setIsPlaying(true);
      audio.play();
      audio.loop = true;
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <main className="flex flex-col h-screen justify-center items-center align-center bg-[url('../public/christmas.png')] font-mono text-white">
      <audio src="/theChristmasSong.mp3" preload="auto" hidden></audio>
      {isOpen && (
        <GiftModal
          handleAddGift={handleAddGift}
          value={value}
          quantity={quantity}
          image={image}
          setValue={setValue}
          setQuantity={setQuantity}
          setImage={setImage}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          to={to}
          setTo={setTo}
          price={price}
          setPrice={setPrice}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}

      {isPreview && <ModalPreview gifts={gifts} setIsPreview={setIsPreview} />}

      <article className="bg-green-600 space-y-4 pt-6 pb-3 px-6 border-2 border-white rounded-lg w-1/3">
        <div className="flex justify-between px-1">
          <h1 className="font-sans font-bold text-6xl pb-2">Regalos </h1>
          <button onClick={handleAudio} className="text-4xl">
            {isPlaying ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
          </button>
        </div>
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
                    className="bg-red-500 border rounded-md p-1 font-white hover:bg-green-500"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleOpenDuplicate(index)}
                    className="bg-red-500 border rounded-md p-1 font-white hover:bg-green-500"
                  >
                    <AiFillGift />
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
              className="bg-red-500 border rounded-md p-1 font-white w-full mb-2"
            >
              Eliminar todo
            </button>
            <button
              onClick={() => handleOpenPreview()}
              className="rounded-md p-1 font-white w-full text-sm"
            >
              Ver lista de compras
            </button>
          </div>
        )}
      </article>
      <footer className="absolute bottom-1 font-bold text-center text-sm text-gray-200">
        <p>
          Made with ❤️ by{" "}
          <Link
            href="https://facuperezm.vercel.app/"
            className="hover:underline hover:text-green-500 transition duration-100"
          >
            Facundo Perez Montalvo
          </Link>
        </p>
      </footer>
    </main>
  );
}
