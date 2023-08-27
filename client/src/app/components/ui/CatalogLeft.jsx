import React from "react";
import PropTypes from "prop-types";

const CatalogLeft = ({ items, selectedItem, onItemSelect, clearFilter }) => {
  return (
    <div className="col-md">
      <h2 className="text-center">Каталог</h2>
      <ul className="list-group">
        {Object.keys(items).map((item) => (
          <button
            key={items[item]._id}
            className={
              "list-group-item list-group-item-action" +
              (items[item]._id === selectedItem ? " active" : "")
            }
            onClick={() => onItemSelect(items[item])}
          >
            {items[item].name}
          </button>
        ))}
        <button className="btn btn-secondary mt-2" onClick={clearFilter}>
          Очистить
        </button>
      </ul>
    </div>
  );
};

CatalogLeft.propTypes = {
  item: PropTypes.object,
  selectedItem: PropTypes.string,
  onItemSelect: PropTypes.func,
  clearFilter: PropTypes.func,
};

export default CatalogLeft;
