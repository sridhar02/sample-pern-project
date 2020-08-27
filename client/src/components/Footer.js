import React from "react";
import { makeStyles } from "@material-ui/core";

const useFooterStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "30vh",
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: theme.spacing(1),
  },
  text: {
    fontSize: "24px",
  },
}));

export default function Footer() {
  const classes = useFooterStyles();
  return (
    <div className={classes.container}>
      <p className={classes.text}>© 2020 Alumini company</p>
    </div>
  );
}
