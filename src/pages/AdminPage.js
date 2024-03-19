import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

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
        //console.log(response.data)
      });
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="upload-body">
    <Navbar />
      <div className="upload-container">
        <form
          id="upload-form"
          className="upload-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>Welcome to the building upload page</h1>

          <input
            type={"text"}
            onChange={(e) =>
              setUpload({ ...upload, buildingName: e.target.value })
            }
            placeholder="Building Name?"
          />
          <input
            type={"text"}
            onChange={(e) =>
              setUpload({ ...upload, coordinates: e.target.value })
            }
            placeholder="Building Coordinates?"
          />
          <button className="admin-button">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
