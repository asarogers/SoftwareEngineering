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
  }));

const NotAuthenticated = () => {
    const classes = useStyles();

  return (
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
  )
}

export default NotAuthenticated