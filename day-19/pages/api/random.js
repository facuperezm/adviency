export default function data(req, res) {
  const random = [
    {
      name: "SILLA",
      quantity: 1,
      image: "",
      to: "Juancito",
    },
    {
      name: "AURIS",
      quantity: 1,
      image: "",
      to: "Roberto",
    },
    {
      name: "PS4",
      quantity: 1,
      image: "",
      to: "Pedro",
    },
    {
      name: "XBOX",
      quantity: 1,
      image: "",
      to: "Juan",
    },
    {
      name: "PC",
      quantity: 1,
      image: "",
      to: "Pedro",
    },
    {
      name: "TECLADO MECANICO",
      quantity: 1,
      image: "",
      to: "Juancito",
    },
    {
      name: "MOUSE LOGITECH",
      quantity: 1,
      image: "",
      to: "Roberto",
    },
  ];

  res.status(200).json(random);
}
