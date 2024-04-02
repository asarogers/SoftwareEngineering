import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  signIn: {
    fontSize: "8pt",
    color: "white",
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
  emptyCartCard: {
    display: "flex",
    flexDirection: "column",
    width: 800,
    height: 650,
    borderRadius: 1,
    boxShadow: 2,
    backgroundColor: "rgb(246,240,240)",
  },
  messageContainer: {
    alignSelf: "center",
    position: "relative",
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: 0,
    top: 70,
    right: 50,
    width: 600,
    height: 120,
    backgroundColor: "#e8dfd1",
  },
  continueShoppingButton: {
    marginTop: 2,
    textAlign: "center",
    fontSize: "19pt",
  },
}));

const EmptyCart = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div >
          <div className="cart-container">
            <div className="cart-inner-container">
                <h2 className="cart-text">Your Cart is Empty</h2>
                <div className="cart-btn-container">
                <button className="continue-shopping-button">Continue Shopping </button>
                </div>
            </div>
          </div>
      </div>
  );
};

export default EmptyCart;
