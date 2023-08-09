import React from "react";
import SlideImg from "../ui/Carousel";
import { CardActionArea } from "@mui/material";
const CatalogPage = () => {
  return (
    <div className="container">
      <h1>Каталог товаров</h1>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col">
          <div class="card h-100">
            <CardActionArea>
              <SlideImg />
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div class="card-body">
                <h5 class="card-title text-center">
                  Крутящийся турник А4(43мм)
                </h5>
                <h4 className="card-title text-center">3800 руб.</h4>
                <button className="btn btn-primary m-5">
                  Добавить в корзину
                </button>
              </div>
            </CardActionArea>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки</h5>
              <p class="card-text">Это короткая карточка.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки</h5>
              <p class="card-text">
                Это более длинная карта С вспомогательным текстом ниже в
                качестве естественного перехода к дополнительному контенту.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки</h5>
              <p class="card-text">
                Это более длинная карта С вспомогательным текстом ниже в
                качестве естественного перехода к дополнительному контенту. Этот
                контент немного длиннее.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
