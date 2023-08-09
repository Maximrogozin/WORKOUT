import React from "react";
import api from "../api";
// import CatalogLeft from "../components/ui/CatalogLeft";
import Pagination from "../components/ui/pagination";
import CatalogCenter from "../components/ui/catalogCenter";
import allCatalog from "../api/fake.api/catalog";

const Main = () => {
  const [catalog, setCatalog] = React.useState([]);
  const [category, setCategory] = React.useState();

  const catalogConverter = (itm) => {
    const array = [];
    for (const key in itm) {
      if (itm.hasOwnProperty(key)) {
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
        const res = await allCatalog.fetchAll();
        setCatalog(catalogConverter(res));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    api.category.fetchAll().then((data) => setCategory(data));
  }, []);
  console.log("category", category);

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

  // const handleCategorySelect = (params) => {
  //   console.log(params);
  // };

  return (
    <div className="container pt-5">
      <div className="row d-flex text-center">
        {/* <CatalogLeft item={category} onItemSelect={handleCategorySelect} /> */}
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

export default Main;
