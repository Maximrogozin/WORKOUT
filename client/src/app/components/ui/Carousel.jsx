// import React from "react";

// export const data = [
//   "https://workoutshop.ru/upload/resize_cache/iblock/a3e/450_450_140cd750bba9870f18aada2478b24840a/a3e2d8895c075b26a388a10f06317876.jpg",
//   "https://workoutshop.ru/upload/resize_cache/iblock/d89/450_450_140cd750bba9870f18aada2478b24840a/d89a8f5c34cbc8faaa1ac6ca1355a3ca.jpg",
//   "https://workoutshop.ru/upload/iblock/5ff/5ff0b5b9038d119b3a911da915d7298d.jpg",
//   "https://workoutshop.ru/upload/iblock/d8b/d8b858bbc9e6ae00a57e6f85135fb3f4.jpg",
// ];
// const SlideImg = () => {
//   return (
//     <div id="carouselExampleIndicators" className="carousel slide">
//       <div className="carousel-indicators">
//         {data.map((i) => (
//           <button
//             type="button"
//             data-bs-target="#carouselExampleIndicators"
//             data-bs-slide-to={i}
//             className={i === 0 ? "active" : ""}
//             aria-current={i === 0 ? "true" : "false"}
//             aria-label={`Slide ${i + 1}`}
//           ></button>
//         ))}
//       </div>
//       <div className="carousel-inner">
//         {data.map((item, i) => (
//           <div className="carousel-item" key={i}>
//             <img
//               className="d-block w-100 h-150"
//               src={item}
//               alt={`Slide ${i}`}
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         className="carousel-control-prev"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Предыдущий</span>
//       </button>
//       <button
//         className="carousel-control-next"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Следующий</span>
//       </button>
//     </div>
//   );
// };

// export default SlideImg;

import React, { useState } from "react";

export const data = [
  "https://workoutshop.ru/upload/resize_cache/iblock/a3e/450_450_140cd750bba9870f18aada2478b24840a/a3e2d8895c075b26a388a10f06317876.jpg",
  "https://workoutshop.ru/upload/resize_cache/iblock/d89/450_450_140cd750bba9870f18aada2478b24840a/d89a8f5c34cbc8faaa1ac6ca1355a3ca.jpg",
  "https://workoutshop.ru/upload/iblock/5ff/5ff0b5b9038d119b3a911da915d7298d.jpg",
  "https://workoutshop.ru/upload/iblock/d8b/d8b858bbc9e6ae00a57e6f85135fb3f4.jpg",
];

const SlideImg = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <div className="loader">Загрузка...</div>}
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-inner">
          {data.map((item, i) => (
            <div
              className={i === 0 ? "carousel-item active" : "carousel-item"}
              key={i}
            >
              <img
                className="d-block w-100 h-150"
                src={item}
                alt={`Slide ${i}`}
                onLoad={i === 0 ? handleImageLoad : null}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Следующий</span>
        </button>
      </div>
    </div>
  );
};

export default SlideImg;
