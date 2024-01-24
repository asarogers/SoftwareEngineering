import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";
import CartPage from "./pages/CartPage";
import About from "./pages/About";


function App() {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState({
    returnedData: [],
    folder: [],
    selectedData: [],
    searchData: [],
    cartItems: [],
    totalPrice: 0,
  });

  var appConditon = ["/show", "/Control", "/assign"];
  var cond = appConditon.indexOf(useLocation().pathname);

  return (
    <>
      {/* Routes are different ways to move between URLs, the home URL has a path of '/', so by given it the element of Home, we have made that the base url */}
      <Routes>
        <Route
          path="/login"
          element={<Login data={data} setData={setData} />}
        />
        <Route
          path="Registration"
          element={<Registration data={data} setData={setData} />}
        />
        <Route
          path="About"
          element={<About data={data} setData={setData} />}
        />
        <Route
          path="CartPage"
          element={<CartPage data={data} setData={setData} />}
        />
        <Route
          element={<RequireAuth allowedRoles={process.env.REACT_APP_ALLOWED} />}
        >
          <Route path="/" element={<Home data={data} setData={setData} />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
