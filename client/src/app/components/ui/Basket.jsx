import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCount,
  deleteCount,
  getBasket,
  getTotalPrice,
  incrementCount,
} from "../../store/catalog";
import { Link } from "react-router-dom";
import FastLogin from "./fastRegistr";
import { Copyright } from "./footer";
import {
  addObjectToArrayInLocalStorage,
  removeObjectFromArrayById,
} from "../../utils/basket.localStorage";
import { ModalBasketComponent } from "./ModalSuccess";
import { ToastContainer, toast } from "react-toastify";

const Basket = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const basket = useSelector(getBasket());
  const res = useSelector(getTotalPrice);
  basket.map((item) => addObjectToArrayInLocalStorage(item));
  const notify = () =>
    toast.warn("Удалено !", {
      position: toast.POSITION.TOP_RIGHT,
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
                <div
                  className="card mb-3"
                  style={{ maxwidth: "540px" }}
                  key={item._id}
                >
                  <div className="row g-0">
                    <div className="col-md-2 d-none d-md-block">
                      <Link
                        to={`/product/${item._id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        {
                          <img
                            src={item.img[0]}
                            className="img-fluid rounded-start"
                            alt={item.name}
                            width="150"
                            height="150"
                          />
                        }
                      </Link>
                    </div>
                    <div className="col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                      <div>
                        <div className="p-4 text-center p-md-5">
                          {item.name}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-6 d-flex justify-content-center align-items-center"
                      sx={{ minHeight: "150px" }}
                    >
                      <div className="col-sm-6">
                        <button
                          className="btn btn-primary "
                          onClick={() => handleIncrement(item._id)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                        <span className="m-2">{item.count}</span>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleDecrement(item._id)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                      </div>
                      <div className="col-sm-6 d-flex p-2 justify-content-center align-items-center">
                        <h6>{`${item.price * item.count} руб.`}</h6>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            margin: "5px",
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                          {<FastLogin setModalShow={setModalShow} />}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Отменить
                          </button>
                          {/* <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={handleOrder}
                          >
                            Заказать
                          </button> */}
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

export default Basket;
