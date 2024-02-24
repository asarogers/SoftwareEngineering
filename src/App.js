import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import AdminPage from "./pages/AdminPage";

function App() {
  const [order, setOrder] = useState({
    locations: [],
    cartItems: [],
    pickupLocation: {},
    dropoffLocation: {},
    selectedItem: {},
    totalPrice: Number
  });

  return (
    <>
      {/* Routes are different ways to move between URLs, the home URL has a path of '/', so by given it the element of Home, we have made that the base url */}
      <Routes>
        <Route
          path="/login"
          element={<Login order={order} setOrder={setOrder} />}
        />
        <Route
          path="Registration"
          element={<Registration order={order} setOrder={setOrder} />}
        />
        <Route
          path="About"
          element={<About order={order} setOrder={setOrder} />}
        />
        <Route
          path="CartPage"
          element={<CartPage order={order} setOrder={setOrder} />}
        />
        <Route
          path="AdminPage"
          element={<AdminPage order={order} setOrder={setOrder} />}
        />

        <Route
          element={<RequireAuth allowedRoles={process.env.REACT_APP_ALLOWED} />}
        >
          <Route
            path="/"
            element={<Home order={order} setOrder={setOrder} />}
          />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
