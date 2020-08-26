import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

import Navbar from "./Navbar";

export default function Profile() {
  const [user, setUser] = useState("");
  const history = useHistory();
  const [isLoggedIn] = useState(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").length !== 0
    ) {
      return true;
    }
    return false;
  });

  const fetchUser = async () => {
    const authToken = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUser(response.data.authData);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!isLoggedIn && <Redirect to="/login" />}
      <Navbar />
      <Typography variant="h6" style={{ marginTop: "70px" }}>
        Profile Page
      </Typography>
      {JSON.stringify( user && user.user.email)}
    </>
  );
}
