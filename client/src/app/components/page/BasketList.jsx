import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Basket from "../ui/Basket";
import {
  decrementCount,
  deleteCount,
  getBasket,
  getTotalPrice,
  incrementCount,
} from "../../store/catalog";
import FastLogin from "../ui/fastRegistr";
import { Copyright } from "../ui/footer";
import {
  addObjectToArrayInLocalStorage,
  removeObjectFromArrayById,
} from "../../utils/basket.localStorage";
import { ModalBasketComponent } from "../ui/ModalSuccess";

const BasketList = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const basket = useSelector(getBasket());
  const res = useSelector(getTotalPrice);
  basket.map((item) => addObjectToArrayInLocalStorage(item));

  const notify = () =>
    toast.warn("Удалено !", {
      position: toast.POSITION.TOP_CENTER,
    });

  const handleIncrement = (id) => {
    dispatch(incrementCount(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementCount(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteCount(id));
    removeObjectFromArrayById(id);
    notify();
  };

  return (
    <div className="container mt-5" sx={{ minHeight: "100vh" }}>
      <div className="row">
        {basket.length ? (
          <>
            <div className="col-xl-8 col-sm-12">
              {basket.map((item) => (
                <Basket
                  item={item}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  handleDelete={handleDelete}
                  key={item._id}
                />
              ))}
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card m-2 text-center">
                <h3 className="m-3">{`Итого: ${res} руб.`}</h3>
                <>
                  <button
                    type="button"
                    className="btn btn-primary m-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Оформить
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Оформление заказа
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {
                            <FastLogin
                              setModalShow={setModalShow}
                              basket={basket}
                            />
                          }
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Отменить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </>
        ) : (
          <div className="m-5">
            <div>
              {" "}
              <h5>В корзине нет товара.</h5>
              <Link to="/">
                <button className="btn btn-primary m-2">
                  Перейти в каталог
                </button>
              </Link>
            </div>
          </div>
        )}
        <ModalBasketComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <ToastContainer />
      </div>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
};

export default BasketList;
