import React from "react";
import { makeStyles, Card, Typography } from "@material-ui/core";

const profile = {
  address: {
    localized: {
      en_US: "2029 Stierlin Ct, Mountain View, CA 94043",
    },
    preferredLocale: {
      country: "US",
      language: "en",
    },
  },
  associations: {
    localized: {
      en_US: "2029 Stierlin Ct, Mountain View, CA 94043",
    },
    preferredLocale: {
      country: "US",
      language: "en",
    },
  },
  backgroundImage: {
    description: {
      localized: {
        en_US: "Description of the image",
      },
      preferredLocale: {
        country: "US",
        language: "en",
      },
    },
    height: 720,
    title: {
      localized: {
        en_US: "Title of the image",
      },
      preferredLocale: {
        country: "US",
        language: "en",
      },
    },
    url: "https://linkedin.com",
    width: 1080,
  },
  birthDate: {
    birthDate: {
      day: 1,
      month: 1,
      year: 1974,
    },
  },
  certifications: {
    id: "",
    authority: "",
    compnay: "",
    endMonthYear: "",
    licenseNumber: "",
    name: "",
    startMonthYear: "",
    url: "",
  },
  contactInstructions: "",
  courses: {
    id: "",
    name: {},
    number: "",
    occupation: "",
  },
  educations: "",
  honors: "",
  ims: "",
  languages: "",
  legacyHonors: "",
  maritalStatus: "",
  organizations: "",
  patents: "",
  phoneNumbers: "",
  projects: "",
  skills: "",
  publications: "",
  summaryRichMediaAssociations: "",
  supportedLocales: "",
  testScores: "",
  volunteeringInterests: "",
  websites: "",
  volunteeringExperiences: "",
};

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
      <p>
        A developer, geek, enthusiast, who loves to solve problems and fix
        things with technology.I am working on 💻frontend web development with
        Javascript and I love contributing to 🌟 open source.
      </p>
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
      <p>Technical Lead</p>
      <p>Company Name: Rave Cyber Solutions Pvt Ltd Full-time</p>
      <p>
        Dates Employed : Apr 2020 – Aug 2020
        <p>
          Employment Duration: 5 mos
          <p>Location:Hyderabad,Telangana, India</p>
        </p>
      </p>
    </Card>
  );
}
//Licenses & Certifications
//Accomplishments
function Skills() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">Skills:</Typography>
      <p>Python,Javascript,HTML,CSS and reactjs</p>
    </Card>
  );
}

//Interests

function Interests() {
  return (
    <Card style={{ margin: "20px 0px", padding: "20px" }}>
      <Typography variant="h6">Interests:</Typography>
    </Card>
  );
}

function UserProfile() {
  return (
    <div>
      <Head />
      <About />
      <Education />
      <Experience />
      <Skills />
      {/* <Interests /> */}
    </div>
  );
}

export default UserProfile;
