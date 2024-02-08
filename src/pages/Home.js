import Navbar from "../components/Navbar";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "../api/axios";

function Home(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { order, setOrder } = props || [];

  //on load function
  useEffect(()=>{
    //requests the locations from the database
    axios.get("/get-locations")
    //
    .then((response)=>{
      //dispalys to the screen
      console.log(response.data)

      //setOrder({ ...order,  pickupLocation: [], dropoffLocation: []});
    })
  },[])


  

  const cycleOptions = [
    { label: "Move Forward", value: "1" },
    { label: "Move Backward", value: "2" },
    { label: "Turn Left", value: "3" },
    { label: "Turn Right", value: "4" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const onSubmit = () => {
    setOrder({ ...order, totalPrice: 25, cartItems: "newCart" });
    // if (selectedOption) {
    //   console.log("clicked", selectedOption);
    //   axios
    //     .post("/send-command", { command: selectedOption })
    //     .then((response) => {
    //       console.log(response.order);
    //     });
    // } else {
    //   console.log("Please select an option.");
    // }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="home-body">
        <div className="home-container">
          <div className="home-form">
            <div className="-pickup-location">
              <strong style={{ color: "white" }}>Pick-Up Location</strong>
              <div className="control-select">
                <Select options={cycleOptions} onChange={handleSelectChange} />
              </div>
            </div>
            <br />
            <div className="item-selection">
              <strong style={{ color: "white" }}>Item Selection</strong>
              <br />
              <div className="control-select">
                <Select
                  options={cycleOptions}
                  onChange={handleSelectChange}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxShadow: state.isFocused
                        ? "0 0 0 2px rgba(0, 123, 255, 0.6)"
                        : "none",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#007BFF" : "white",
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                />
              </div>
            </div>
            <br />
            <div className="drop-off-location">
              <strong style={{ color: "white" }}>Drop-Off Location</strong>
              <div className="control-select">
                <Select
                  options={cycleOptions}
                  onChange={handleSelectChange}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxShadow: state.isFocused
                        ? "0 0 0 2px rgba(0, 123, 255, 0.6)"
                        : "none",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#007BFF" : "white",
                      color: state.isSelected ? "white" : "black",
                    }),
                  }}
                />
                <br />
                <button
                  className="start-create start-button"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="map">map</div>
      </div>
    </div>
  );
}

export default Home;
