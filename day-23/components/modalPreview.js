import { useEffect } from "react";

export default function ModalPreview({ gifts, setIsPreview }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setIsPreview(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsPreview]);

  return (
    <>
      <div className="flex justify-center align-center items-center absolute w-full h-full backdrop-blur-sm bg-black bg-opacity-40 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <article className="flex flex-col text-left text-black only:justify-center align-center space-y-2 bg-white rounded-md p-4 ring-2 ring-black focus:ring-1 focus:ring-black">
          <h1 className="font-sans text-5xl text-center mb-2">Comprar:</h1>
          <ul>
            {gifts.map((gift, index) => (
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
                    🎄 {gift.name} ({gift.quantity})
                  </p>
                  <p className="text-xs font-thin text-gray-400">
                    🎅🏻 {gift.to}
                  </p>
                </div>
              </div>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className="bg-red-500 border rounded-md p-1 font-white text-white print:hidden"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-green-500 border rounded-md p-1 font-white text-white print:hidden"
          >
            Imprimir
          </button>
        </article>
      </div>
    </>
  );
}
