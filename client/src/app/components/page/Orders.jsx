import React from "react";
import { useSelector } from "react-redux";
import { getOrdersList } from "../../store/orders";

const Orders = () => {
  const orders = useSelector(getOrdersList());
  return (
    <div className="container p-2">
      <div className="row">
        <h1 className="text-center">Заказы</h1>
        {orders && (
          <ul className="list-group">
            <li className="list-group-item p-2">
              <div className="row text-center">
                <div className="col">Имя</div>
                <div className="col">Фамилия</div>
                <div className="col">Email</div>
                <div className="col">Телефон</div>
              </div>
            </li>
            <div className="accordion" id="accordionExample">
              {orders.map((item) => (
                <div className="accordion-item" key={item._id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${item._id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${item._id}`}
                    >
                      <div className="row text-center align-items-center w-100">
                        <div className="col-2 text-center">
                          {item.firstName}
                        </div>
                        <div className="col-2 text-center">{item.lastName}</div>
                        <div className="col-2">{item.email}</div>
                        <div className="col-2">{item.phone}</div>
                      </div>
                    </button>
                  </h2>
                  {item.product && (
                    <div
                      id={`collapse${item._id}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <ul className="list-group">
                        {item.product.map(({ name, count, price, _id }) => (
                          <li className="list-group-item" key={_id}>
                            <div className="row">
                              {" "}
                              <div className="col-6">{`Наименование:   ${name}`}</div>
                              <div className="col-2">{`Количество:  ${count} шт`}</div>
                              <div className="col-2">{`Цена ${price} руб.`}</div>
                              <div className="col-2">{`Итого ${
                                price * count
                              } руб.`}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
