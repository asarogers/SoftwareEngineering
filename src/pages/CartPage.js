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

function Cart(props) {
  const classes = useStyles();
  const { data, setData } = props || [];

  const { auth } = useAuth();

  var element = data;
  const deleteItem = (deletedItem) => {
    //console.log(data.totalPrice, deletedItem.price)
    const newPrice = data.totalPrice - deletedItem.price;
    const newCart = element.cartItems.filter(
      (item) => item.id !== deletedItem.id
    );
    setData({
      ...data,
      totalPrice: newPrice,
      cartItems: newCart,
    });

    //send to backend
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
    < Navbar/>

      <Box>
        {auth?.user ? (
          element.cartItems.length > 0 ? (
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={2} md={2} lg={2}>
                <Card className={classes.shoppingBackground}>
                  <Typography
                    variant="h6"
                    component="div"
                    className={classes.tableBody}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell> . </TableCell>
                          <TableCell>
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
                        {element.cartItems.map((item, index) => {
                          //console.log(index)
                          return (
                            <>
                              <TableRow
                                key={index + "row"}
                                sx={{
                                  background: "white",
                                  border: "2px solid #c2c0be",
                                  marginTop: 0,
                                }}
                              >
                                <TableCell key={index + "cell1"}>
                                  <CardMedia
                                    component="img"
                                    image={item.image}
                                    sx={{ height: 50, minWidth: 50 }}
                                  />
                                  {}
                                </TableCell>
                                <TableCell key={index + "cell2"}>
                                  {item.itemName}
                                </TableCell>
                                <TableCell key={index + "cell3"}>
                                  ${item.price}
                                </TableCell>
                                <TableCell key={index + "cell4"}>
                                  <Button
                                    size="small"
                                    onClick={() => {
                                      deleteItem(item);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Typography>
                </Card>
              </Grid>

              <Card className={classes.subtotalBody}>
                <Box className={classes.subtotalBox}>
                  <h2 style={{ marginRight: 10 }}>Subtotal</h2>
                  <h2>${element.totalPrice?.toFixed(2)}</h2>
                </Box>
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
            <Grid align="center">
              <Grid item xs={1} md={1} lg={1.1}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 800,
                    height: 650,
                    borderRadius: 1,
                    boxShadow: 2,
                    backgroundColor: "rgb(246,240,240)",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
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
                    }}
                  >
                    <Typography
                      variant="body4"
                      component="p"
                      sx={{
                        marginTop: 2,
                        textAlign: "center",
                        fontSize: "19pt",
                      }}
                    >
                      {"Your Cart is Empty"}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.signIn}
                    >
                      Continue Shopping
                    </Button>
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          )
        ) : element?.cartItems.length == 0 ? (
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={2} md={2} lg={2}>
              <Card className={classes.shoppingBackground}>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.tableBody}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell> . </TableCell>
                        <TableCell>
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
                      {[
                        {price: 12, itemName:"thing" }, {price: 15}
                      ].map((item, index) => {
                        //console.log(index)
                        return (
                          <>
                            <TableRow
                              key={index + "row"}
                              sx={{
                                background: "white",
                                border: "2px solid #c2c0be",
                                marginTop: 0,
                              }}
                            >
                              <TableCell key={index + "cell1"}>
                                <CardMedia
                                  component="img"
                                  image={item.image}
                                  sx={{ height: 50, minWidth: 50 }}
                                />
                                {}
                              </TableCell>
                              <TableCell key={index + "cell2"}>
                                {item.itemName}
                              </TableCell>
                              <TableCell key={index + "cell3"}>
                                ${item.price}
                              </TableCell>
                              <TableCell key={index + "cell4"}>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    deleteItem(item);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Typography>
              </Card>
            </Grid>

            <Card className={classes.subtotalBody}>
              <Box className={classes.subtotalBox}>
                <h2 style={{ marginRight: 10 }}>Subtotal</h2>
                <h2>${element.totalPrice.toFixed(2)}</h2>
              </Box>
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
          <Grid align="center">
            <Grid item xs={1} md={1} lg={1.1}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 800,
                  height: 650,
                  borderRadius: 1,
                  boxShadow: 2,
                  backgroundColor: "rgb(246,240,240)",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
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
                  }}
                >
                  <Typography
                    variant="body4"
                    component="p"
                    sx={{ marginTop: 2, textAlign: "center", fontSize: "19pt" }}
                  >
                    {"Your Cart is Empty"}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.signIn}
                  >
                    Sign in to your account
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: "8pt",
                      backgroundColor: "white",
                      border: "1px solid white",
                      outlineColor: "#3498ca",
                      color: "black",
                      borderRadius: "30px",
                      width: "auto",
                      marginTop: 0.2,
                      "&:hover": {
                        backgroundColor: "#a8a7a5",
                        outlineColor: "#a8a7a5",
                        color: "white",
                      },
                    }}
                  >
                    Sign up now
                  </Button>
                </Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Cart;
