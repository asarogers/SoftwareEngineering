import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import axios from "../api/axios";
import GoogleMapAPI from "../components/GoogleMapAPI";
import useAuth from "../hooks/useAuth";

function Home({ order = {}, setOrder, robotPosition, setRobotPosition }) {
  const { auth } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/get-locations");
        const tempArray = response.data.map((element) => ({
          label: element.buildingName,
          value: element.coordinates,
        }));
        setOrder((prevOrder) => ({ ...prevOrder, locations: tempArray }));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, [setOrder]);

  useEffect(() => {
    console.log(robotPosition, " works");
  }, [robotPosition]);

  const cycleOptions = [
    { label: "Burger", value: "Burger", price: "9.95", image: "burger.jpg" },
    { label: "Fries", value: "Fries", price: "2.99", image: "fries.jpg" },
    { label: "Icecream", value: "Icecream", price: "4.50", image: "icecream.jpg" },
    { label: "Drinks", value: "Drinks", price: "2.90", image: "drinks.jpg" },
  ];

  const onSubmit = async () => {
    try {
      const response = await axios.post("/post-cartItem", {
        auth: auth,
        cartItem: order.selectedItem,
        pickupLocation: order.pickupLocation.value,
        dropoffLocation: order.dropoffLocation.value,
      });

      if (response.data.code === "success") {
        setShowSuccessMessage(true);
      } else {
        setShowErrorMessage(true);
      }

      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error posting item to cart:", error);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    }
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
            <div className="pickup-location">
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
            <GoogleMapAPI robotPosition={robotPosition} setRobotPosition={setRobotPosition} />
          </div>
        </div>
      </div>
      {showSuccessMessage && <div className="success-message">Item added to cart successfully!</div>}
      {showErrorMessage && <div className="error-message">Failed to add item to cart. Please try again later.</div>}
    </div>
  );
}

export default Home;
