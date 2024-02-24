import React, {useEffect} from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import NotAuthenticated from "../components/NotAuthenticated";
import EmptyCart from "../components/EmptyCart";
import img from "../components/imgs/green.jpg";

const useStyles = makeStyles((theme) => ({
  signIn: {
    fontSize: "8pt",
    color: "black",
    borderRadius: "30px",
    width: "auto",
    marginTop: 1,
    marginRight: "1vw",
    maxWidth: 300,
    backgroundColor: "#ffb84f",
    "&:hover": {
      backgroundColor: "#cf7d03",
      color: "white",
    },
  },
  tableBody: {
    alignSelf: "center",
    position: "relative",
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: 0,
    top: 20,
    maxWidth: 600,
    minWidth: 400,
    width: "45vw",
    height: "85vh",
    backgroundColor: "#e8dfd1",
    borderRadius: "30px  30px 30px 30px",
  },
  subtotalBody: {
    marginLeft: 5,
    marginTop: "20vh",
    width: 250,
    minWidth: 200,
    height: 80,
    backgroundColor: "#e8dfd1",
    justifyContent: "center",
    borderRadius: "10px  10px 10px 10px",
  },
  shoppingBackground: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
    minWidth: 400,
    width: "45vw",
    height: "85vh",
    borderRadius: 1,
    boxShadow: 2,
    backgroundColor: "rgb(246,240,240)",
  },
  subtotalBox: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: 10,
    height: 30,
    width: "inherit",
  },
}));

const CartItem = ({ item, deleteItem }) => (
  <TableRow sx={{ background: "white", border: "2px solid #c2c0be", marginTop: 0 }}>
    <TableCell>
      {/* <CardMedia component="img" image={item.image} sx={{ height: 50, minWidth: 50 }} /> */}
      <img src={require("../components/imgs/icecream.jpg")}/>
    </TableCell>
    <TableCell>{item.label}</TableCell>
    <TableCell>${item.price}</TableCell>
    <TableCell>
      <Button size="small" onClick={() => deleteItem(item)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

const Cart = ({ order, setOrder }) => {
  useEffect(()=>{
    console.log(order)
  },[])
  const classes = useStyles();
  const { auth } = useAuth();

  const deleteItem = (deletedItem) => {
    const newPrice = order.totalPrice - deletedItem.price;
    const newCart = order.cartItems.filter(item => item.id !== deletedItem.id);
    setOrder({ ...order, totalPrice: newPrice, cartItems: newCart });

    if (auth?.user) {
      axios.post(process.env.REACT_APP_CART_SUBTRACTION, {
        cart: newCart,
        auth: auth,
        totalPrice: newPrice,
      }).then(response => {
        // Handle response if needed
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box>
        {auth?.user ? (
          order?.cartItems.length > 0 ? (
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={12} md={6} lg={4}>
                <Card className={classes.shoppingBackground}>
                  <Typography variant="h6" component="div" className={classes.tableBody}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell />
                          <TableCell>
                            <Typography variant="body4" component="p" sx={{ textAlign: "center", fontSize: "19pt" }}>
                              Shopping Cart
                            </Typography>
                          </TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                        {order.cartItems.map((item, index) => (
                          <CartItem key={index} item={item} deleteItem={deleteItem} />
                        ))}
                      </TableBody>
                    </Table>
                  </Typography>
                </Card>
              </Grid>
              <Card className={classes.subtotalBody}>
                <Box className={classes.subtotalBox}>
                  <h2 style={{ marginRight: 10 }}>Subtotal</h2>
                  <h2>${order.totalPrice}</h2>
                </Box>
                <Box height={30} alignItems="center" justifyContent="center" display="flex">
                  <Button variant="contained" size="small" className={classes.signIn}>
                    Proceed to Checkout
                  </Button>
                </Box>
              </Card>
            </Grid>
          ) : (
            <EmptyCart />
          )
        ) : (
          <NotAuthenticated />
        )}
      </Box>
    </>
  );
};

export default Cart;
