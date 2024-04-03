import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import AmmuLogo from "../components/imgs/aamu_logo.jpg";

const AdminPage = () => {
  const [upload, setUpload] = useState({
    buildingName: "",
    coordinates: "",
  });

  useEffect(() => {
    //console.log(upload);
  }, [upload]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.post("/upload-building", { upload: upload }).then((response) => {
        console.log(response.data)
      });
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="upload-body">
      <Navbar />
      <div className="admin-container">
        <div className="aamu-logo-left ">
          <img
            src={AmmuLogo}
            style={{ width: "inherit", height: "inherit" }}
            alt="Ammu Logo"
          />
        </div>
        <div className="aamu-logo algin-right">
          <img
            src={AmmuLogo}
            style={{ width: "inherit", height: "inherit" }}
            alt="Ammu Logo"
          />
        </div>
        <form
          id="upload-form"
          className="upload-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divider" />
          <h1>Upload a New Building</h1>
          <div className="divider" />
          <div className="upload-items">
            <label className="item-label">New Building</label>
            <input
              className="item-input"
              type={"text"}
              onChange={(e) =>
                setUpload({ ...upload, buildingName: e.target.value })
              }
              placeholder="Building Name?"
            />
          </div>

          <div className="upload-items">
            <label className="item-label">Coordinates</label>
            <input
              className="item-input"
              type={"text"}
              onChange={(e) =>
                setUpload({ ...upload, coordinates: e.target.value })
              }
              placeholder="Building Coordinates?"
            />
          </div>

          <div className="btn-container">
            <button className="admin-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
