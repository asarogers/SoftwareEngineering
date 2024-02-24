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
    totalPrice: 0
  });

  const startLocation = { lat: 34.7838, lng: -86.5722 };
  const [robotPosition, setRobotPosition] = useState(startLocation);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login order={order} setOrder={setOrder} />} />
      <Route path="/registration" element={<Registration order={order} setOrder={setOrder} />} />
      <Route path="/about" element={<About order={order} setOrder={setOrder} />} />
      <Route path="/cartpage" element={<CartPage order={order} setOrder={setOrder} deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} robotPosition={robotPosition} setRobotPosition={setRobotPosition} />} />
      <Route path="/adminpage" element={<AdminPage order={order} setOrder={setOrder} />} />
      
      <Route element={<RequireAuth allowedRoles={process.env.REACT_APP_ALLOWED} />}>
        <Route path="/" element={<Home order={order} setOrder={setOrder} robotPosition={robotPosition} setRobotPosition={setRobotPosition} />} />
      </Route>
      
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
