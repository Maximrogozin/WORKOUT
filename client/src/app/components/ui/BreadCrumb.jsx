import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCatalogsById } from "../../store/catalog";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadName = useSelector(getCatalogsById(pathnames[1]));

  return (
    <div className="p-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Главная</Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li
                key={index}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {name.length > 9 ? breadName.name : name}
              </li>
            ) : (
              <li key={index} className="breadcrumb-item">
                <Link to={routeTo}>{name}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
