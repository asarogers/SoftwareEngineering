// Importing necessary dependencies and components
import React from "react";
import {
  Box,
  Button,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import NotAuthenticated from "../components/NotAuthenticated";
import EmptyCart from "../components/EmptyCart";
import img from "../components/imgs/green.jpg";

// Styling using makeStyles
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
    alignItems: "cemter",
    justifyContent: "center",
    display: "flex",
    marginTop: 10,
    height: 30,
    width: "inherit",
  },
}));

// Component for rendering individual items in the cart
const CartItem = ({ item, deleteItem }) => (
  <TableRow
    sx={{ background: "white", border: "2px solid #c2c0be", marginTop: 0 }}
  >
    <TableCell>
      <CardMedia
        component="img"
        image={item.image}
        sx={{ height: 50, minWidth: 50 }}
      />
    </TableCell>
    <TableCell>{item.itemName}</TableCell>
    <TableCell>${item.price}</TableCell>
    <TableCell>
      <Button size="small" onClick={() => deleteItem(item)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

// Main Cart component
const Cart = (props) => {
  // Initializing styles and extracting order and setOrder from props
  const classes = useStyles();
  const { order, setOrder } = props || [];
  const { auth } = useAuth();

  console.log("checking", order);
  // Function to delete an item from the cart
  const deleteItem = (deletedItem) => {
    const newPrice = order.totalPrice - deletedItem.price;
    const newCart = order.cartItems.filter(
      (item) => item.id !== deletedItem.id
    );
    setOrder({ ...order, totalPrice: newPrice, cartItems: newCart });

    // Sending updated cart order to the backend
    if (auth?.user) {
      axios
        .post(process.env.REACT_APP_CART_SUBTRACTION, {
          cart: newCart,
          auth: auth,
          totalPrice: newPrice,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  return (
    <>
      {/* Displaying the Navbar */}
      <Navbar />
      <Box>
        {auth?.user ? (
          //checks if there are items in the carItem array
          order.cartItems.length === 0 ? (
            // Rendering the shopping cart when there are items
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={2} md={2} lg={2}>
                {/* Shopping Cart card */}
                <Card className={classes.shoppingBackground}>
                  <Typography
                    variant="h6"
                    component="div"
                    className={classes.tableBody}
                  >
                    {/* Table displaying cart items */}
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell> . </TableCell>
                          <TableCell>
                            {/* Heading */}
                            <Typography
                              variant="body4"
                              component="p"
                              sx={{
                                textAlign: "center",
                                fontSize: "19pt",
                              }}
                            >
                              {"Shopping Cart"}
                            </Typography>
                          </TableCell>
                          <TableCell> Price </TableCell>
                        </TableRow>
                        {/* Mapping through cart items and rendering each item using CartItem component */}
                        {[{ itemName: "random", price: "25", image: img }].map(
                          (item, index) => (
                            <CartItem
                              key={index}
                              item={item}
                              deleteItem={deleteItem}
                            />
                          )
                        )}
                      </TableBody>
                    </Table>
                  </Typography>
                </Card>
              </Grid>
              {/* Subtotal card */}
              <Card className={classes.subtotalBody}>
                <Box className={classes.subtotalBox}>
                  {/* Subtotal information */}
                  <h2 style={{ marginRight: 10 }}>Subtotal</h2>
                  <h2>${order.totalPrice?.toFixed(2)}</h2>
                </Box>
                {/* Proceed to Checkout button */}
                <Box
                  height={30}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                >
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.signIn}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Card>
            </Grid>
          ) : (
            // Render when the cart is empty
            <EmptyCart />
          )
        ) : (
          // Render when the user is not authenticated
          <NotAuthenticated />
        )}
      </Box>
    </>
  );
};

export default Cart;
