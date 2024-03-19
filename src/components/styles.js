import { makeStyles } from "@mui/styles";

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
  cartItemImage: {
    height: 55,
    width: 50,
  },
}));

export default useStyles;
