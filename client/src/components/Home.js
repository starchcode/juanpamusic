import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationHandler } from "../hooks/AnimationNavigation";
import "./css/home.css";
import { languageData } from "./languageFile/languageFile";
import SocialLinks from "./SocialLinks";
import Bio from "./Bio";
import ContactForm from "./ContactForm";
import juanpapic1 from "../media/juanpapic1.jpg";
import Image from "./Image.js";

const Home = (props) => {
  const [handleNav] = NavigationHandler(props.components);
  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);
  const adminData = useSelector((state) => state.adminData);

  const callToActionText = languageData[selectedLanguage].menu;
  const contactText = languageData[selectedLanguage].contact.text;

  //TODO: remove this :
  useEffect(() => {
    console.log("Home DID MOUNT");
  }, []);

  if (!adminData.response) return "Loading...";

  const ytID = adminData.response.home[0];
  const spotifyID = adminData.response.home[1];

  return (
    // <div id="home" ref={homeRef}>
    <div id="home" className="beforeEntry" ref={props.reference}>
      <div id="homeBG"></div>
      <div id="juanpapic1">
        <Image
          src={juanpapic1}
          alt="juanpa playing guitar"
          initClasses="beforeEntry"
          classesToAdd="fadein"
        />
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
          id="youtube"
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${ytID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className=""
          ></iframe>
        <div id="home_linkBox">
          <h1
            onClick={() => handleNav(`/${selectedLanguage}/music`)}
            className="whiteBG"
          >
            {/* <h1  className="whiteBG"> */}
            {callToActionText[2]}
          </h1>
          <h1
            onClick={() => handleNav(`/${selectedLanguage}/shows`)}
            className="whiteBG"
          >
            {callToActionText[3]}
          </h1>
          {/* <h1  className="whiteBG">{callToActionText[3]}</h1> */}
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
