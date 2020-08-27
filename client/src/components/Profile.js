import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import Divider from "@material-ui/core/Divider";
import { Redirect, useLocation } from "react-router-dom";
import { Typography, makeStyles, Button } from "@material-ui/core";

import Navbar from "./Navbar";
import Footer from "./Footer";
import UserProfile from "./UserProfile";

const useUserProfileStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    background: "#f5f5f5",
    padding: theme.spacing(2),
    height: "90vh",
    marginTop: "55px",
  },
  main: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // border: "1px solid black",
    maxWidth: "100%",
  },
  button: {
    marginTop: "35px",
    width: "220px",
  },
}));

function UserProfileDetails({ user }) {
  const classes = useUserProfileStyles();
  let location = useLocation();
  const [userData, setUserData] = useState("");

  const LinkedIn = {
    response_type: "code",
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
    state: "DCEeFWf45A53sdfKef424",
    scope: `r_liteprofile `,
  };

  const linkedIncode = new URLSearchParams(location.search).get("code");

  const requestSever = async () => {
    const authToken = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/linkedInOauth/${linkedIncode}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUserData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const profileURL = queryString.stringify(LinkedIn);
  const authURL = `https://www.linkedin.com/oauth/v2/authorization/?${profileURL}`;

  useEffect(() => {
    linkedIncode !== null && requestSever();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h6">Profile Page</Typography>
      <div className={classes.main}>
        {/* <Typography variant="body2">Email: {user.email}</Typography>
        <Divider />
        <Typography variant="body2">User Name: {user.username}</Typography>
        <Divider /> */}
        <Button variant="contained">
          <a href={authURL}>LinkedIn</a>
        </Button>
        {/* <Divider /> */}
        {/* <p>{JSON.stringify(userData)}</p> */}
        <UserProfile />
      </div>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState("");
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
        setUser(response.data);
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
      {user && <UserProfileDetails user={user.user} />}
      <Footer />
    </>
  );
}

export default Profile;
