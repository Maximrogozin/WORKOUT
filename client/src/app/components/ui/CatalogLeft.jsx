/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { getCategoryLoadingStatus } from "../../store/category";

const CatalogLeft = ({ items, selectedItem, onItemSelect, clearFilter }) => {
  const loading = useSelector(getCategoryLoadingStatus());
  console.log(loading);
  return (
    <div className="col-md">
      {items ? (
        <>
          <h2 className="text-center">Каталог</h2>
          <ul className="list-group">
            {Object.keys(items).map((item) => (
              <li
                key={items[item]._id}
                className={
                  "list-group-item list-group-item-action" +
                  (items[item]._id === selectedItem ? " active" : "")
                }
                onClick={() => onItemSelect(items[item])}
              >
                {items[item].name}
              </li>
            ))}
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </ul>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CatalogLeft;
