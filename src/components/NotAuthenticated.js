// Importing necessary dependencies and components
import React from "react";
import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

// Styling using makeStyles
const useStyles = makeStyles((theme) => ({
  signIn: {
    fontSize: "8pt",
    borderRadius: "30px",
    width: "auto",
    marginTop: 1,
    marginRight: "1vw",
    maxWidth: 300,
    backgroundColor: "#ffb84f",
    outlineColor: "#ffb84f",
    color: "black",
    "&:hover": {
      backgroundColor: "#cf7d03",
      color: "white",
    },
  },
}));

const NotAuthenticated = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <div className="cart-container">
        <div className="cart-inner-container">
          <h2 className="cart-text">Your Cart is Empty</h2>
          <div className="cart-btn-container">
            <div className="cart-inner-btn-container"> 
              <button className="continue-shopping-button" onClick={()=>{ navigate("/login", { replace: true })}}>
                Sign Into your Account{" "}
              </button>
              <button className="continue-shopping-button" onClick={()=>{ navigate("/", { replace: true })}}>
                Continue Shopping{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthenticated;
