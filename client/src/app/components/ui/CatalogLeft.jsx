import React from "react";

const CatalogLeft = ({ items, selectedItem, onItemSelect, clearFilter }) => {
  return (
    <div className="col-md">
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
    </div>
  );
};

export default CatalogLeft;
