import React from "react";
import {
  Button,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";



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


const EmptyCart = () => {
    const classes = useStyles();
  return (
    <Grid align="center">
              <Grid item xs={1} md={1} lg={1.1}>
                {/* Empty Cart card */}
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
                    {/* Continue Shopping button */}
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
}

export default EmptyCart