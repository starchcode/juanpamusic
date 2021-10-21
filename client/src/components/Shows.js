import React from "react";

import "./css/shows.css";
import { languageData } from "./languageFile/languageFile";

import showsjuanpa from "../media/showsjuanpa.jpg";

const Shows = (props) => {
  const renderShows = () => {
    const infoText = languageData[props.lan].shows[0];

    return props.data.shows.map((show, i) => {
      const month = languageData[props.lan].dates.months[new Date(`${show[1]}/${show[2]}/${show[0]}`).getMonth()]
      const day = languageData[props.lan].dates.days[new Date(`${show[1]}/${show[2]}/${show[0]}`).getDay()]
      const title = props.lan === 'en' ? show[4] : show[5];
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
  return <div id="shows">{renderShows()}</div>;
};

export default Shows;
