import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";

const useNavbarStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
  },
}));

export default function Navbar() {
  const classes = useNavbarStyles();
  return (
    <AppBar>
      <div className={classes.container}>
        <a className={classes.link} href="/">
          Sample
        </a>
        <a className={classes.link} href="#home">
          Home
        </a>
        <a className={classes.link} href="/profile">
          Profile
        </a>
        <a className={classes.link} href="/profile">
          Dashboard
        </a>
      </div>
    </AppBar>
  );
}
