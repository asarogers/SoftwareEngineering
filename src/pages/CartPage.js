import React, { useEffect, useState } from "react";
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
import styles from "../components/styles"


const useStyles = styles

const Cart = ({ order, setOrder, robotPosition , setRobotPosition }) => {
  const onLoad=()=>{
     // Fetch cart items and calculate total on component mount
     axios
     .post("/retrieve-cartItem", { auth })
     .then((response) => {
       const totalPrice = response.data.total;
       setOrder({ ...order, cartItems: response.data.result, totalPrice: totalPrice.toFixed(2), pickupLocation: response.data.pickupLocation, dropoffLocation:response.data.dropoffLocation });
       //console.log(response.data)
     })
     .catch((error) => {
       console.error("Error fetching cart items:", error);
     });
  }
  const { auth } = useAuth();

  useEffect(() => {
    onLoad()
  }, [auth]);

  const classes = useStyles();

  const deleteItem = (item) => {
    

    if (auth?.user) {
      const newPrice = order.totalPrice - item.price;
      const newCart = order.cartItems.filter(item => item.orderID !== item.orderID);
      setOrder({ ...order, totalPrice: newPrice, cartItems: newCart });

      axios.post("delete-item", {
        orderID:item.orderID,
        auth: auth,
      }).then(response => {
        console.log(response.data)
        onLoad()
      });
    }
  };

  const CartItem = ({ item}) => (
    <TableRow sx={{ background: "white", border: "2px solid #c2c0be", marginTop: 0 }}>
      <TableCell>
        <img src={require(`../components/imgs/${item.image}`)} alt={item.label} style={{height: 55, width:50}}/>
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

  const startRobot = ()=>{
    //console.log(order)
    axios.post("start-robot", {
      pickupLocation: order.pickupLocation,
      dropoffLocation: order.dropoffLocation
    }).then(response => {
      console.log(response.data)
      if (response.data === "stop") {
        console.log("Stop signal received from backend");
      } else {
        // Continuously receive messages until a stop signal is received
        console.log("beginning loop")
        setTimeout(() => {
          receiveMessages(1);
        }, 3000);
       
      }
    });
  };

  const receiveMessages = async(num) => {
    const response = await axios.get("retrieve-gps-coordinates")
    if(response){
        if (response.data === "stop") {
          console.log("Stop signal received from backend");
        } else {

          // Continue receiving messages
          console.log(response.data, num)
          const newPosition = {
            lat: robotPosition.lat + (0.0001 * num), // Adjust the movement speed if needed
            lng: robotPosition.lng // Keep the longitude the same
          };

          num = num +1
          setRobotPosition(newPosition);
          setTimeout(() => {
            receiveMessages(num);
          }, 3000);
        }
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
                  <Button variant="contained" size="small" className={classes.signIn} onClick={()=>{startRobot()}}>
                    start robot
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
                                        