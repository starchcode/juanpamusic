import React from "react";
import { useSelector } from "react-redux";
import { NavigationHandler } from "../hooks/AnimationNavigation";
import "./css/music.css";
import MusicBox from "./MusicBox";
import ScrollToTop from "./ScrollToTop";

const Music = (props) => {
  NavigationHandler([props.reference]); //to fadein
  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);
  const disography = useSelector((state) => state.adminData.response.music);

  const renderMusic = () => {
    return disography.map((data, i) => {
      return <MusicBox key={i} data={data} i={i} lan={selectedLanguage} />;
    });
  };
  return (
    <React.Fragment>
      <ScrollToTop />
      <div id="music" className="beforeEntry" ref={props.reference}>
        {renderMusic()}
      </div>
    </React.Fragment>
  );
};

export default Music;
