import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import UserProfile from "./UserProfile";



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
      {user && <UserProfile />}
      <Footer />
    </>
  );
}

export default Profile;
