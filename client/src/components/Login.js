import React, { useState } from "react";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useLoginStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
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
}));

export default function Login() {
  const classes = useLoginStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.container}>
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
