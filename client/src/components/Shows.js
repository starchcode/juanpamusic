import React from "react";
import { useSelector } from "react-redux";
import "./css/shows.css";
import { languageData } from "./languageFile/languageFile";

import showsjuanpa from "../media/showsjuanpa.jpg";
import { FadeInHandler } from "../hooks/AnimationNavigation";

const Shows = (props) => {
  const selectedLanguage = useSelector(state => state.selectedLanguage.lan);

  const renderShows = () => {
    const infoText = languageData[selectedLanguage].shows[0];
    FadeInHandler(props.reference) 

    return props.data.shows.map((show, i) => {
      const month = languageData[selectedLanguage].dates.months[new Date(`${show[1]}/${show[2]}/${show[0]}`).getMonth()]
      const day = languageData[selectedLanguage].dates.days[new Date(`${show[1]}/${show[2]}/${show[0]}`).getDay()]
      const title = selectedLanguage === 'en' ? show[4] : show[5];
      return (
        <div className="showsBox" key={i}>
          <div className="showsLeft">
            <p>{month} - {show[0]}</p>
            <p>{show[2]}</p>
            <p>{day}</p>
            <p>19:00</p>
          </div>
          <div className="showsRight">
            <p>{title}</p> 
            <div><a href={show[7]} target="_blank" rel="noreferrer">{infoText}</a></div>
            <img src={showsjuanpa} alt="juanpa playing guitar" />
          </div>
        </div>
      );
    });
  };
  if (!props.data) return "Loading...";
  return <div id="shows" ref={props.reference} className="beforeEntry">{renderShows()}</div>;
};

export default Shows;
