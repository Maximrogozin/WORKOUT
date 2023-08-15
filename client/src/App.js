import NavBar from "./app/components/ui/navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./app/layouts/main";
import Breadcrumbs from "./app/components/ui/BreadCrumb";
// import Footer from "./app/components/ui/footer";
import ProductDescriptionPage from "./app/components/page/productDescriptionPage";
import Basket from "./app/components/ui/Basket";
import SignUp from "./app/components/ui/SignUp";
import SignIn from "./app/components/ui/SignIn";

function App() {
  return (
    <div>
      <NavBar />
      <Breadcrumbs style={{ padding: "50" }} />
      <Routes>
        <Route path="/basket/" element={<Basket />} />
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductDescriptionPage />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
