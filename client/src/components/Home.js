import React, { useEffect } from "react";
import { languageData } from "./languageFile/languageFile";
import { useSelector } from "react-redux";

import "./css/home.css";
import SocialLinks from "./SocialLinks";
import Bio from "./Bio";
import ContactForm from "./ContactForm";

import juanpapic1 from "../media/juanpapic1.jpg";

// import NavigationAnimation from "../hooks/NavigationAnimation";
import { FadeInHandler } from "../hooks/AnimationNavigation";
const Home = (props) => {
  // const homeRef = React.useRef(null);
  // const [handleNavigation] = NavigationAnimation(homeRef) 
  const fadeInHandler = FadeInHandler(props.reference) 

  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);
  const adminData = useSelector((state) => state.adminData);


  const callToActionText = languageData[selectedLanguage].menu;
  const contactText = languageData[selectedLanguage].contact.text;

  if (!adminData.response) return "Loading...";

  const ytID = adminData.response.home[0];
  const spotifyID = adminData.response.home[1];

  return (
    // <div id="home" ref={homeRef}>
    <div id="home" className="beforeEntry" ref={props.reference}>
      <div id="homeBG"></div>
      <div id="juanpapic1">
        <img src={juanpapic1} alt="juanpa playing guitar" />
      </div>
      <div id="home_main">
        <iframe
          title="spotify playlist"
          id="spotify"
          src={`https://open.spotify.com/embed/playlist/${spotifyID}`}
          width="250"
          height="380"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${ytID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div id="home_linkBox">
          {/* <h1 onClick={()=>handleNavigation(`${selectedLanguage}/music`)} className="whiteBG"> */}
          <h1  className="whiteBG">
            {callToActionText[2]}
          </h1>
          {/* <h1 onClick={()=>handleNavigation(`${selectedLanguage}/shows`)} className="whiteBG">{callToActionText[3]}</h1> */}
          <h1  className="whiteBG">{callToActionText[3]}</h1>
          <SocialLinks />
        </div>
      </div>
      <Bio data={adminData.response.home} lan={selectedLanguage} />
      <div id="contactSection">
        <div id="contactText">
          <h2>{contactText[0]}</h2>
          <p>{contactText[1]}</p>
          <p>{contactText[2]}</p>
          <a href="mailto: juanpapilla@hotmail.com">
            juanpapilla [at] hotmail.com
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
