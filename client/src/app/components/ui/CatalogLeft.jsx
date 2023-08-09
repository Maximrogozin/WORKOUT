/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const CatalogLeft = ({ items }) => {
  if (items.length > 0) {
    return (
      <div className="col-md">
        <h2 className="text-center">Каталог</h2>
        <ul className="list-group">
          {Object.keys(items).map((item) => (
            <li>{items[item].name}</li>
            // <div key={items[item.id]} style={{ textAlign: "left" }}>
            //   <a
            //     href="#"
            //     className="list-group-item list-group-item-action d-flex align-items-center p-1"
            //   >
            //     <img src={items[item.img]} height="30" alt={items[item.name]} />
            //     <span className="m-2">{items[item.name]}</span>
            //   </a>
            // </div>
          ))}
        </ul>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default CatalogLeft;

/* {catalog.map((item) => (
          <div key={item.id} style={{ textAlign: "left" }}>
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex align-items-center p-1"
            >
              <img src={item.img} height="30" alt="Турники и брусья" />
              <span className="m-2">{item.name}</span>
            </a>
          </div>
        ))} */
