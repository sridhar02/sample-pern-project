import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { Redirect, useParams, useLocation } from "react-router-dom";
import { Typography, makeStyles, Button } from "@material-ui/core";

import Navbar from "./Navbar";
import Footer from "./Footer";

const useUserProfileStyles = makeStyles((theme) => ({
  container: {
    margin: "15px",
    marginTop: "75px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
  },
  main: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    border: "1px solid black",
    maxWidth: "350px",
  },
  button: {
    marginTop: "35px",
    width: "220px",
  },
}));

function UserProfileDetails({ user }) {
  const classes = useUserProfileStyles();
  let { code } = useParams();
  let { search } = useLocation();

  const LinkedIn = {
    response_type: "code",
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
    state: "DCEeFWf45A53sdfKef424",
    scope: `r_liteprofile `,
  };

  const linkedIncode = search.slice(6);
  
  const requestSever = () =>{

  }

  // const profileURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile&client_id={}&redirect_uri={};
  const profileURL = queryString.stringify(LinkedIn);
  const authURL = `https://www.linkedin.com/oauth/v2/authorization/?${profileURL}`;

  return (
    <div className={classes.container}>
      <Typography variant="h6">Profile Page</Typography>
      <div className={classes.main}>
        <Typography variant="body2">Email: {user.email}</Typography>
        <Typography variant="body2">User Name: {user.username}</Typography>
        {/* <a href="#asdas">Sync With LinkedIn</a> */}
        <a href={authURL} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function Profile() {
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
      {user && <UserProfileDetails user={user.user} />}
      <Footer />
    </>
  );
}
