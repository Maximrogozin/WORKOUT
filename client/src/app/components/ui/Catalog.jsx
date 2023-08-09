/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import API from "../../api";
import CatalogLeft from "./CatalogLeft";
import Pagination from "./pagination";
import CatalogCenter from "./catalogCenter";
import allCatalog from "../../api/fake.api/catalog";

const Catalog = () => {
  const [catalog, setCatalog] = React.useState([]);
  const [catalog2, setCatalog2] = React.useState([]);

  const catalogConverter = (itm) => {
    const array = [];
    for (const key in itm) {
      if (itm.hasOwnProperty(key)) {
        // Corrected to "itm"
        array.push(...itm[key]);
      }
    }
    console.log(array);
    return array;
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res2 = await API.catalog.fetchAll();
        setCatalog2(res2);

        const res = await allCatalog.fetchAll();
        setCatalog(catalogConverter(res));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const count = catalog.length;
  const pageSize = 20;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const catalogCrop = paginate(catalog, currentPage, pageSize);

  return (
    <div className="container pt-5">
      <div className="row d-flex text-center">
        <CatalogLeft catalog={catalog2} />
        <div className="col-md-10 ">
          <div className="row d-block">
            <div className="col-md-12 mt-5 card">Функция фильтрации </div>
            <div className="col-md-12 mt-5">
              <div className="d-flex">
                <div className="row row-cols-1 row-cols-md-4">
                  {catalogCrop.map((item, index) => (
                    <CatalogCenter key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
