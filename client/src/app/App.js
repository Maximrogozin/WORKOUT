import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/ui/navbar";
import Main from "./layouts/main";
import Breadcrumbs from "./components/ui/BreadCrumb";
import ProductDescriptionPage from "./components/page/productDescriptionPage";
import SignUp from "./components/ui/SignUp";
import SignIn from "./components/ui/SignIn";
import AppLoader from "./components/ui/hoc/appLoader";
import FastLogin from "./components/ui/fastRegistr";
import Test from "./components/page/Orders";
import Orders from "./components/page/Orders";
import Users from "./components/page/Users";
import ProtectedRouteAdmin from "./components/common/protectedRouteAdmin";
import ProtectedRoute from "./components/common/protectedRoute";
import BasketList from "./components/page/BasketList";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Breadcrumbs style={{ padding: "50" }} />
        <Routes>
          <Route path="/basket/" element={<BasketList />} />
          <Route path="/fastLogin" element={<FastLogin />} />
          <Route
            path="/orders"
            element={<ProtectedRoute component={Orders} />}
          />
          <Route
            path="/users"
            element={<ProtectedRouteAdmin component={Users} />}
          />
          <Route path="/" element={<Main />} />
          <Route path="/description" element={<Test />} />
          <Route path="/product/:id" element={<ProductDescriptionPage />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLoader>
    </div>
  );
}

export default App;
