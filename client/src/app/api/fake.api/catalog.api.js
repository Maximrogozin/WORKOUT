import { nanoid } from "nanoid";
const catalog = [
  {
    id: nanoid(),
    img: "https://workoutshop.ru/upload/resize_cache/iblock/a3e/450_450_140cd750bba9870f18aada2478b24840a/a3e2d8895c075b26a388a10f06317876.jpg",
    name: "Турники и брусья",
    url: "turniki_brusya",
    price: 3800,
  },
  {
    id: nanoid(),
    img: "https://workoutshop.ru/upload/resize_cache/iblock/d89/450_450_140cd750bba9870f18aada2478b24840a/d89a8f5c34cbc8faaa1ac6ca1355a3ca.jpg",
    name: "Утяжелители",
    url: "utyazheliteli",
    price: 3800,
  },
  {
    id: nanoid(),
    img: "https://workoutshop.ru/upload/iblock/5ff/5ff0b5b9038d119b3a911da915d7298d.jpg",
    name: "Эспандеры",
    url: "espandery",
    price: 3800,
  },
  {
    id: nanoid(),
    img: "https://workoutshop.ru/upload/iblock/d8b/d8b858bbc9e6ae00a57e6f85135fb3f4.jpg",
    name: "Инвентарь",
    url: "inventar",
    price: 3800,
  },
];
if (!localStorage.getItem("catalog")) {
  localStorage.setItem("catalog", JSON.stringify(catalog));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("catalog")));
    }, 2000);
  });
const update = (id, data) =>
  new Promise((resolve) => {
    const catalog = JSON.parse(localStorage.getItem("catalog"));
    const userIndex = catalog.findIndex((u) => u._id === id);
    catalog[userIndex] = { ...catalog[userIndex], ...data };
    localStorage.setItem("catalog", JSON.stringify(catalog));
    resolve(catalog[userIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("catalog")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchAll,
  getById,
  update,
};
