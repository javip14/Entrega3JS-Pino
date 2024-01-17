export const productos = [
  {
    id: 1,
    nombre: "Harry Potter Barita",
    precio: 150,
    imagen:"https://cdn11.bigcommerce.com/s-mpz9h6/images/stencil/608x608/products/167705/288363/30613_xl__47118.1687278931.jpg?c=2",
    categoria:"Harry Potter"
  },
  {
    id: 2,
    nombre: "Hermoine Granger",
    precio: 100,
    imagen:"https://cdn11.bigcommerce.com/s-mpz9h6/images/stencil/608x608/products/168909/289833/30614_xl__30004.1691162215.jpg?c=2",
    categoria:"Harry Potter"
  },
  {
    id: 3,
    nombre: "Ronaldo",
    precio: 50,
    imagen:"https://img.kwcdn.com/product/1e19d462c8b/ad877051-ce2f-48c7-b43a-2d79e69c28c6_1000x1000.jpeg?imageView2/2/w/800/q/70/format/webp",
    categoria:"Fútbol"
  },
  {
    id: 4,
    nombre: "Messi",
    precio: 50,
    imagen:"https://img.kwcdn.com/product/1e19d462c8b/3b6292b0-9688-4b77-af00-0e58a0e56fb1_1000x1000.jpeg?imageView2/2/w/800/q/70/format/webp",
    categoria:"Fútbol"
  },
  {
    id: 5,
    nombre: "Neymar",
    precio: 50,
    imagen:"https://img.kwcdn.com/product/1e19d462c8b/aa7e0e47-e174-4031-9605-29024ccb0a19_1000x1000.jpeg?imageView2/2/w/800/q/70/format/webp",
    categoria:"Fútbol"
  },
  {
    id: 6,
    nombre: "Homero Rosquilla",
    precio: 350,
    imagen:"https://img.fantaskycdn.com/0a6851d922da82d822a4d8f89956ed6c_1080x.jpeg",
    categoria:"Simpsons"
  },
  {
    id: 7,
    nombre: "Bart Tatuaje",
    precio: 350,
    imagen:"https://img.fantaskycdn.com/adc264aa2aa9e47926280a96f340bcb2_1080x.jpeg",
    categoria:"Simpsons"
  },
  {
    id: 8,
    nombre: "Lisa L",
    precio: 150,
    imagen:"https://img.fantaskycdn.com/5142b98bd78118b0b3d85b505638b47e_1080x.jpeg",
    categoria:"Simpsons"
  }
];


JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));

