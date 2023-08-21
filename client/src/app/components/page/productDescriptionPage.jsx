/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import Slider from "../ui/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogsById, incrementCount } from "../../store/catalog";

const ProductDescriptionPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  const id = path[path.length - 1];
  const {
    name,
    img,
    _id,
    count,
    equipment,
    characteristics,
    proportions,
    price,
    description,
  } = useSelector(getCatalogsById(id));
  const dispatch = useDispatch();
  const handleIncrement = (id) => {
    dispatch(incrementCount(id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-md-6 p-auto text-center">
            <h2 className="card-title">{name}</h2>
            <Slider images={img} sx={{ margin: "auto" }} key={id} />
          </div>
          <div className="col-md-6 text-center p-5">
            <h4>{`Цена ${price} руб.`}</h4>
            <div className="box mb-2">
              {count > 0 ? (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(_id)}
                >
                  В корзине{" "}
                  <span className="badge text-bg-secondary">{count}</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(_id)}
                >
                  В корзину
                </button>
              )}
            </div>
            {proportions && (
              <>
                <h2>Размеры</h2>
                <img src={proportions} className="w-50" alt="Размеры" />
              </>
            )}
          </div>
        </div>
        <div className="row p-5">
          <h2 className="text-center">Описание</h2>
          <p className="card-text">{description}</p>
        </div>
        <div className="row">
          <div className="col-md-6">
            {characteristics && (
              <>
                <h2 className="text-center">Характеристики</h2>
                <ul className="m-5">
                  {characteristics.map((item) => (
                    <li className="m-2">{`- ${item}`}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="col-md-6">
            {equipment && (
              <>
                <h2 className="text-center">Комплектация</h2>
                <ul className="m-5">
                  {equipment.map((item) => (
                    <li className="m-2">{`- ${item}`}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
