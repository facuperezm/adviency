import { useState, useEffect } from "react";
import GiftModal from "../components/modal.js";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

export default function Home() {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [gifts, setGifts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [destinatario, setDestinatario] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
      JSON.stringify([...gifts, { name: value, quantity, image, destinatario }])
    );
    setGifts([...gifts, { name: value, quantity, image, destinatario }]);
    setValue("");
    setQuantity("");
    setImage("");
    setIsOpen(false);
    setDestinatario("");
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
    setIsEditing(!isEditing);
    setIsOpen(true);
    setValue(gifts[index].name);
    setQuantity(gifts[index].quantity);
    setImage(gifts[index].image);
    setDestinatario(gifts[index].destinatario);
    const newGifts = gifts.filter((gift, i) => i !== index);
    localStorage.setItem("gifts", JSON.stringify(newGifts));
    setGifts(newGifts);
    setIsEditing(false);
  };

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
          destinatario={destinatario}
          setDestinatario={setDestinatario}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}

      <article className="bg-green-600 space-y-5 p-6 border-2 border-white rounded-xl">
        <h1 className="font-sans text-5xl font-bold">Adviency Día 14</h1>

        <button
          type="button"
          onClick={handleModal}
          className="bg-green-500 border rounded-md p-1 font-white w-full"
        >
          Agregar regalo
        </button>

        <div className="space-y-2">
          {!gifts.length ? (
            <p className="text-center">No hay regalos</p>
          ) : (
            gifts?.map((gift, index) => (
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
                  <p className="text-md">
                    🎄 {gift.name} x{gift.quantity}
                  </p>
                  <p className="text-sm font-thin">🎅🏻 {gift.destinatario}</p>
                </div>
                <div className="space-x-1">
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
        {gifts.length > 0 && (
          <button
            type="button"
            onClick={removeAll}
            className="bg-red-500 border rounded-md p-1 font-white w-full"
          >
            Eliminar todo
          </button>
        )}
      </article>
    </main>
  );
}
