import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:slug?" element={<Shop />} />
        <Route path="/product/details/:category/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view-cart" element={<Cart />} />
      </Route>


      <Route path="admin-panel">
        <Route path="category" element={<MainLayout/>}>
          <Route path="add" element="Add Category"/>
          <Route path="view" element="View Category"/>
          <Route path="update" element="Update Category"/>
        </Route>

        <Route path="product">
          <Route path="add" element="Add Category"/>
          <Route path="view" element="View Category"/>
          <Route path="update" element="Update Category"/>
        </Route>
      </Route>

      


    </Routes>
  );
};

export default AppRoutes;