import React from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../ui/Slider";
import { getCatalogsById, incrementCount } from "../../store/catalog";
import { Copyright } from "../ui/footer";
import ProductDetail from "../ui/ProductDetails";

const ProductDescriptionPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  const id = path[path.length - 1];
  const product = useSelector(getCatalogsById(id));
  const dispatch = useDispatch();
  const notify = () =>
    toast.success("Добавлено !", {
      position: toast.POSITION.TOP_CENTER,
    });
  const handleIncrement = (id) => {
    dispatch(incrementCount(id));
    notify();
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="row">
          <div className="col-md-6 p-auto text-center">
            <h2 className="card-title">{product.name}</h2>
            {product.img && (
              <Slider images={product.img} sx={{ margin: "auto" }} />
            )}
          </div>
          <div className="col-md-6 text-center p-5">
            <h4>{`Цена ${product.price} руб.`}</h4>
            <div className="box mb-2">
              {product.count > 0 ? (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(product._id)}
                >
                  В корзине{" "}
                  <span className="badge text-bg-secondary">
                    {product.count}
                  </span>
                </button>
              ) : (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(product._id)}
                >
                  В корзину
                </button>
              )}
            </div>

            {product.proportions && (
              <>
                <h2>Размеры</h2>
                <img src={product.proportions} className="w-50" alt="Размеры" />
              </>
            )}
            {/* конец редактирования размеров */}
          </div>
        </div>
        <div className="row p-5">
          <h2 className="text-center">Описание</h2>

          <div className="card-text">{product.description}</div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {product.characteristics && (
              <ProductDetail detail={product.characteristics} />
            )}
          </div>
          <div className="col-md-6">
            {product.equipment && <ProductDetail detail={product.equipment} />}
          </div>
        </div>
        <ToastContainer />
      </div>
      <Copyright sx={{ m: 5 }} />
    </div>
  );
};

export default ProductDescriptionPage;
