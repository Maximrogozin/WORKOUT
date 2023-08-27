import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrdersList } from "../../store/orders";
import OrdersList from "../ui/OrdersList";
import { rootUsers } from "../../store/users";

const Orders = () => {
  const dispatch = useDispatch();
  dispatch(rootUsers());
  const orders = useSelector(getOrdersList());

  return (
    <div className="container p-2">
      <div className="row">
        <h1 className="text-center">Заказы</h1>
        {orders && (
          <ul className="list-group">
            <li className="list-group-item p-2">
              <div className="row text-center">
                <div className="col-3">Имя</div>
                <div className="col-3">Фамилия</div>
                <div className="col-3">Email</div>
                <div className="col-3">Телефон</div>
              </div>
            </li>
            <div className="accordion" id="accordionExample">
              {orders.map((item) => (
                <OrdersList item={item} key={item._id} />
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
