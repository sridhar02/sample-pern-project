import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Typography, Button, makeStyles } from "@material-ui/core";

function Head() {
  return (
    <Card style={{ margin: "20px 0px" }}>
      <img
        style={{ borderRadius: "8px", textAlign: "center" }}
        width="150px"
        height="100px"
        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        alt="asdasd"
      />
      <div>
        <Typography variant="body1"> Name: Sridhar Katta</Typography>
        <Typography variant="body1">Email: test@gmail.com</Typography>
        {/* <Typography variant="body1">Name:</Typography> */}
        {/* <Typography variant="body1">Name:</Typography> */}
      </div>
    </Card>
  );
}

function About() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">About:</Typography>
      <Typography variant="body1">
        A developer, geek, enthusiast, who loves to solve problems and fix
        things with technology.I am working on frontend web development with
        Javascript and I love contributing to open source.
      </Typography>
    </Card>
  );
}

function Education() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">Education:</Typography>
      <Typography variant="body2">
        Jawaharlal Nehru Technological University, Kakinada
      </Typography>
      <Typography variant="body2">
        Degree Name: Bachelor of TechnologyField Of StudyPetroleum Engineering
        Dates attended or expected
      </Typography>
      <Typography variant="body2">graduation: 2015 – 2019</Typography>
    </Card>
  );
}

function Experience() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">Experience:</Typography>
      <Typography variant="body1">Technical Lead</Typography>
      <p>Company Name: Rave Cyber Solutions Pvt Ltd Full-time</p>
      <p>Dates Employed : Apr 2020 – Aug 2020</p>
      <p>Employment Duration: 5 mos</p>
      <p>Location:Hyderabad,Telangana, India</p>
    </Card>
  );
}
//Licenses & Certifications
//Accomplishments
function Skills() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">Skills:</Typography>
      <Typography variant="body1">
        Python,Javascript,HTML,CSS and Reactjs
      </Typography>
    </Card>
  );
}

//Interests

// function Interests() {
//   return (
//     <Card style={{ margin: "20px 0px", padding: "20px" }}>
//       <Typography variant="h6">Interests:</Typography>
//     </Card>
//   );
// }
const useUserProfileStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5",
    padding: theme.spacing(2),
    // height: "90vh",
    marginTop: "55px",
  },
  main: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "100%",
  },
}));

function UserProfile() {
  let location = useLocation();
  const classes = useUserProfileStyles();
  const [userData, setUserData] = useState("");
  const linkedIncode = new URLSearchParams(location.search).get("code");
  const history = useHistory();

  const LinkedIn = {
    response_type: "code",
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
    state: "DCEeFWf45A53sdfKef424",
    scope: `r_liteprofile `,
  };
  const profileURL = queryString.stringify(LinkedIn);
  const authURL = `https://www.linkedin.com/oauth/v2/authorization/?${profileURL}`;

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
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    linkedIncode !== null && requestSever();
    history.push('/profile');
  }, [linkedIncode]);

  console.log(userData);
  
  return (
    <div className={classes.container}>
      <Typography variant="h6">Profile Page</Typography>
      <Button variant="contained">
        <a href={authURL}>LinkedIn</a>
      </Button>
      <Head />
      <About />
      <Education />
      <Experience />
      <Skills />
    </div>
  );
}

export default UserProfile;
