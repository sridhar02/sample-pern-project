import React from "react";
import { AppBar, makeStyles, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <AppBar>
      <div className={classes.container}>
        <a className={classes.link} href="/">
          Alumini Connect
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
        <button className={classes.link} onClick={handleLogout}>
          logout
        </button>
      </div>
    </AppBar>
  );
}
