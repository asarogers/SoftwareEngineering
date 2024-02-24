import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import axios from "../api/axios";
import GoogleMapAPI from "../components/GoogleMapAPI"; // Assuming this component uses google.maps API
import useAuth from "../hooks/useAuth";

function Home({ order = {}, setOrder }) {
  const { auth } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    axios
      .get("/get-locations")
      .then((response) => {
        const tempArray = response.data.map((element) => ({
          label: element.buildingName,
          value: element.coordinates,
        }));
        setOrder((prevOrder) => ({ ...prevOrder, locations: tempArray }));
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, [setOrder]);

  const cycleOptions = [
    { label: "Burger", value: "1", price: "9.95", image: "../components/imgs/burger.jpg" },
    { label: "Fries", value: "1", price: "2.99", image: "../components/imgs/fries.jpg" },
    { label: "Icecream", value: "1", price: "4.50", image: "../components/imgs/icecream.jpg" },
    { label: "Drinks", value: "1", price: "2.90", image: "../components/imgs/drinks.jpg" },
  ];

  const onSubmit = () => {
    const newItemPrice = parseFloat(order.selectedItem.price);
    const currentTotal = parseFloat(order.totalPrice) || 0;
    const newTotal = (currentTotal + newItemPrice).toFixed(2);

    axios
      .post("/post-cartItem", { user: auth.user, cartItem: order.selectedItem, totalPrice: newTotal })
      .then((response) => {
        if (response.data.code === "success") {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2000);
        } else {
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error posting item to cart:", error);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      });
  };

  const handleScreenClick = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="home-body" onClick={handleScreenClick}>
        <div className="home-container">
          <div className="home-form">
            <div className="-pickup-location">
              <strong style={{ color: "white" }}>Pick-Up Location</strong>
              <div className="control-select">
                <Select
                  options={order.locations}
                  onChange={(location) => setOrder((prevOrder) => ({ ...prevOrder, pickupLocation: location }))}
                />
              </div>
            </div>
            <br />
            <div className="item-selection">
              <strong style={{ color: "white" }}>Item Selection</strong>
              <br />
              <div className="control-select">
                <Select
                  options={cycleOptions}
                  onChange={(item) => setOrder((prevOrder) => ({ ...prevOrder, selectedItem: item }))}
                />
              </div>
            </div>
            <br />
            <div className="drop-off-location">
              <strong style={{ color: "white" }}>Drop-Off Location</strong>
              <div className="control-select">
                <Select
                  options={order.locations}
                  onChange={(location) => setOrder((prevOrder) => ({ ...prevOrder, dropoffLocation: location }))}
                />
                <button className="home-btn" onClick={onSubmit}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="map">
            <GoogleMapAPI />
          </div>
        </div>
      </div>
      {showSuccessMessage && <div className="success-message">Item added to cart successfully!</div>}
      {showErrorMessage && <div className="error-message">Failed to add item to cart. Please try again later.</div>}
    </div>
  );
}

export default Home;
