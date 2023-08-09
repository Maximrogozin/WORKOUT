/* eslint-disable import/no-anonymous-default-export */
export const categoriiObject = {
  turniki_brusya: { _id: "67rdca3eeb7f6fgeed471818", name: "Турники и брусья" },
  utyazheliteli: { _id: "67rdca3eeb7f6fgeed471820", name: "Утяжелители" },
  espandery: { _id: "67rdca3eeb7f6fgeed471814", name: "Эспандеры" },
  inventar: { _id: "67rdca3eeb7f6fgeed471822", name: "Инвентарь" },
};
export const categorii = [
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Турники и брусья",
    img: "https://workoutshop.ru/upload/resize_cache/iblock/a3e/450_450_140cd750bba9870f18aada2478b24840a/a3e2d8895c075b26a388a10f06317876.jpg",
  },

  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Утяжелители",
    img: "https://workoutshop.ru/upload/resize_cache/iblock/d89/450_450_140cd750bba9870f18aada2478b24840a/d89a8f5c34cbc8faaa1ac6ca1355a3ca.jpg",
  },

  {
    _id: "67rdca3eeb7f6fgeed471814",
    name: "Эспандеры",
    img: "https://workoutshop.ru/upload/iblock/5ff/5ff0b5b9038d119b3a911da915d7298d.jpg",
  },
  {
    _id: "67rdca3eeb7f6fgeed471822",
    name: "Инвентарь",
    img: "https://workoutshop.ru/upload/iblock/d8b/d8b858bbc9e6ae00a57e6f85135fb3f4.jpg",
  },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(categoriiObject);
    }, 2000);
  });

export default {
  fetchAll,
};
