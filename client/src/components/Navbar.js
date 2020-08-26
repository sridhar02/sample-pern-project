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
  button:{
    padding:"0px",
    color:"#fff"
  }
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
        <Button className={classes.button} onClick={handleLogout}>
          logout
        </Button>
      </div>
    </AppBar>
  );
}
