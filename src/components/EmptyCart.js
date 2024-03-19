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
    <Grid align="center">
      <Grid item xs={1} md={1} lg={1.1}>
        <Card className={classes.emptyCartCard}>
          <Typography variant="h6" component="div" className={classes.messageContainer}>
            <Typography variant="body4" component="p" className={classes.continueShoppingButton}>
              Your Cart is Empty
            </Typography>
            <Button variant="contained" size="small" className={classes.signIn} onClick={() =>{navigate("/")}}>
              Continue Shopping
            </Button>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmptyCart;
