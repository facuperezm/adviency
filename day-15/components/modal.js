export default function GiftModal({
  handleAddGift,
  value,
  quantity,
  image,
  setValue,
  setQuantity,
  setImage,
  setIsOpen,
  isOpen,
  to,
  setTo,
  isEditing,
  setIsEditing,
}) {
  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
  };

  const handleRandom = () => {
    fetch("/api/random")
      .then((res) => res.json())
      .then((data) => {
        const random = data[Math.floor(Math.random() * data.length)];
        setValue(random.name);
        setQuantity(random.quantity);
        setImage(random.image);
        setTo(random.to);
      });
  };

  return (
    <div className="flex justify-center align-center items-center absolute w-full h-full backdrop-blur-sm bg-black bg-opacity-40 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <form
        action="submit"
        onSubmit={handleAddGift}
        className="flex flex-col text-left justify-center align-center space-y-2 bg-white rounded-md p-4 ring-2 ring-black focus:ring-1 focus:ring-black"
      >
        <h1 className="text-black text-2xl text-center">
          {isEditing ? "Edita tu regalo" : "Agrega tu regalo"}{" "}
        </h1>

        <label className="text-black text-left" for="gift">
          Regalo
        </label>

        <input
          className="p-1 rounded-md text-black border border-gray-300 "
          type="text"
          placeholder="Medias"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          id="gift"
        />
        <label className="text-black text-left" for="quantity">
          Cantidad
        </label>
        <input
          className="p-1 rounded-md text-black border border-gray-300"
          type="number"
          placeholder="2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          id="quantity"
        />
        <label className="text-black text-left" for="imagen">
          Imagen
        </label>
        <input
          className="p-1 rounded-md text-black border border-gray-300"
          type="text"
          placeholder="https://image.."
          value={image}
          onChange={(e) => setImage(e.target.value)}
          id="imagen"
        />
        <label className="text-black text-left" for="to">
          Para quien es?
        </label>
        <input
          className="p-1 rounded-md text-black border border-gray-300"
          type="text"
          placeholder="Goncy"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          id="to"
        />
        <button className="text-red-900" onClick={handleRandom}>
          ¡Regalo random!
        </button>
        <button
          type="submit"
          className="bg-red-500 border rounded-md p-1 font-white"
        >
          Agregar
        </button>
        <button className="text-black" onClick={handleClose}>
          Cerrar
        </button>
      </form>
    </div>
  );
}
