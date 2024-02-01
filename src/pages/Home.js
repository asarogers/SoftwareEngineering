import Navbar from "../components/Navbar";
import Select from "react-select";
import { useState } from "react";
import axios from "../api/axios";

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

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
    if (selectedOption) {
      console.log("clicked", selectedOption);
      axios
        .post("/send-command", { command: selectedOption })
        .then((response) => {
          console.log(response.data);
        });
    } else {
      console.log("Please select an option.");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="home-body">
        <div className="home-container">
          <div className="home-form">
            <div className="pick-up-location">
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
