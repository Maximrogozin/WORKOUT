import NavBar from "./app/components/ui/navbar";
import { Route, Routes } from "react-router-dom";
import Main from "./app/layouts/main";
import Catalog from "./app/components/ui/Catalog";
import Breadcrumbs from "./app/components/ui/BreadCrumb";

function App() {
  return (
    <div>
      <NavBar />
      <Breadcrumbs style={{ padding: "50" }} />
      <Routes>
        <Route path="/basket/" element={<Catalog />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
