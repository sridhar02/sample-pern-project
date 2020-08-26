import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useRegisterStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#a9d9cd",
  },
  textField: {
    margin: "10px 0px",
  },
  buttons: {
    display: "flex",
  },
  loginButton: {
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  main: {
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
  },
}));

export default function Register() {
  const classes = useRegisterStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authToken] = useState(localStorage.getItem("token"));

  if (authToken) {
    history.push("/profile");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/register`,
        {
          email,
          username,
          password,
        }
      );
      if (response.status === 200) {
        history.push("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.container}>
        <div className={classes.main}>
          <Typography variant="h6">User Registration</Typography>
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
            variant="outlined"
            label="username"
            type="text"
            id="outlined-username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.loginButton}
            >
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
