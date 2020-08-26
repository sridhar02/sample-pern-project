import React, { useState } from "react";
import axios from "axios";
import login from "./login.svg";
import { useHistory } from "react-router-dom";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useLoginStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background:"#a9d9cd",
    // background: "#95a5a6",
    background: "#a9d9cd",
  },
  textField: {
    margin: "10px 0px",
  },
  main: {
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
  },
  image: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function Login() {
  const classes = useLoginStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authToken] = useState(localStorage.getItem("token"));

  if (authToken) {
    history.push("/profile");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        history.push("/profile");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.container}>
        <img src={login} style={{ width: "500px" }} className={classes.image} alt="login logo"/>
        <div className={classes.main}>
          <Typography variant="h6">User Login</Typography>
          <TextField
            className={classes.textField}
            id="outlined-email-input"
            label="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.textField}
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <a href="/">
            <p> Don't have an account? Register </p>
          </a>
        </div>
      </div>
    </form>
  );
}
