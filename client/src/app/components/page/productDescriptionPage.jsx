/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import Slider from "../ui/Slider";
import Loader from "../ui/Loader";

const ProductDescriptionPage = () => {
  const [product, setProduct] = useState();
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  const id = path[path.length - 1];

  console.log(path[path.length - 1]);
  useEffect(() => {
    api.allCatalog.getById(id).then((res) => setProduct(res));
    console.log(product);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {product ? (
          <>
            <div className="row">
              <div className="col-md-6 p-auto text-center">
                <h2 className="card-title">{product.name}</h2>
                <Slider
                  images={product.img}
                  sx={{ margin: "auto" }}
                  key={product.id}
                />
              </div>
              <div className="col-md-6 text-center p-5">
                <h4>{`Цена ${product.price} руб.`}</h4>
                <div className="box mb-2">
                  <button className="btn btn-primary m-2">В корзину</button>
                </div>
                {product.proportions && (
                  <>
                    <h2>Размеры</h2>
                    <img
                      src={product.proportions}
                      className="w-50"
                      alt="Размеры"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="row p-5">
              <h2 className="text-center">Описание</h2>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="row">
              <div className="col-md-6">
                {product.characteristics && (
                  <>
                    <h2 className="text-center">Характеристики</h2>
                    <ul className="m-5">
                      {product.characteristics.map((item) => (
                        <li className="m-2">{`- ${item}`}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="col-md-6">
                {product.equipment && (
                  <>
                    <h2 className="text-center">Комплектация</h2>
                    <ul className="m-5">
                      {product.equipment.map((item) => (
                        <li className="m-2">{`- ${item}`}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
