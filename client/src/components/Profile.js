import React from "react";
import { Typography } from "@material-ui/core";

import Navbar from "./Navbar";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Typography variant="h6" style={{ marginTop: "70px" }}>
        Profile Page
      </Typography>
    </>
  );
}
