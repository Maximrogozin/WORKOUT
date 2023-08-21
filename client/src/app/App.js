import NavBar from "./components/ui/navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./layouts/main";
import Breadcrumbs from "./components/ui/BreadCrumb";
// import Footer from "./app/components/ui/footer";
import ProductDescriptionPage from "./components/page/productDescriptionPage";
import Basket from "./components/ui/Basket";
import SignUp from "./components/ui/SignUp";
import SignIn from "./components/ui/SignIn";
import AppLoader from "./components/ui/hoc/appLoader";
import FastLogin from "./components/ui/fastRegistr";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Breadcrumbs style={{ padding: "50" }} />
        <Routes>
          <Route path="/basket/" element={<Basket />} />
          <Route path="/fastLogin" element={<FastLogin />} />
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDescriptionPage />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLoader>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
