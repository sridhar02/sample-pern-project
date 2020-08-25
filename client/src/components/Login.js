import React, { useState } from "react";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useLoginStyles = makeStyles((theme) => ({
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
        <Typography>User Login</Typography>
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
      </div>
    </form>
  );
}
