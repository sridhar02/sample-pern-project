import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useRegisterStyles = makeStyles((theme) => ({
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
}));

export default function Register() {
  const classes = useRegisterStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  console.log(email, password, username);
  return (
    <form>
      <div className={classes.container}>
        <Typography>User Registration</Typography>
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
    </form>
  );
}
