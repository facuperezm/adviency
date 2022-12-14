export default function Home() {
  const regalos = ["una Tuki-Bombilla", "un perrito", "una PS5"];
  return (
    <div className="bg-[url('../public/christmas.png')] h-screen flex flex-col justify-center items-center text-white font-mono">
      <div className="flex flex-col justify-center border-2 rounded-xl items-center p-6 bg-green-600">
        <h1 className="font-sans text-5xl pb-5">Regalos!</h1>
        <ul className="text-left flex flex-col px-4">
          {regalos.map((regalo, index) => (
            <li className="" key={index}>
              🎄 {regalo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
