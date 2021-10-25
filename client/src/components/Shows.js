import React from "react";
import { useSelector } from "react-redux";
import { NavigationHandler } from "../hooks/AnimationNavigation";
import { languageData } from "./languageFile/languageFile";
import "./css/shows.css";
import showsjuanpa from "../media/showsjuanpa.jpg";


const Shows = (props) => {
  NavigationHandler([props.reference]); //to make component fade
  const selectedLanguage = useSelector(state => state.selectedLanguage.lan);
  const upcomingShows = useSelector(state => state.adminData.response.shows.upcoming)
  const pastShows = useSelector(state => state.adminData.response.shows.pastshows)


  const renderUpcomingShows = () => {
    const infoText = languageData[selectedLanguage].shows[0];

    return upcomingShows.map((show, i) => {
      const month = languageData[selectedLanguage].dates.months[new Date(`${show[1]}/${show[2]}/${show[0]}`).getMonth()]
      const day = languageData[selectedLanguage].dates.days[new Date(`${show[1]}/${show[2]}/${show[0]}`).getDay()]
      const title = selectedLanguage === 'en' ? show[4] : show[5];
      return (
        <div className="showsBox" key={i}>
          <div className="showsLeft">
            <p>{month}</p>
            <p>{show[2]}</p>
            <p>{show[0]}</p>
            <p>{day}</p>
            <p>{show[3]}</p>
          </div>
          <div className="showsRight">
            <p>{title} @{show[6]}</p> 
            <div><a href={show[7]} target="_blank" rel="noreferrer">{infoText}</a></div>
            <img src={showsjuanpa} alt="juanpa playing guitar" />
          </div>
        </div>
      );
    });
  };
  const renderPastShows = () => {
    const infoText = languageData[selectedLanguage].shows[0];

    return pastShows.map((show, i) => {
      const month = languageData[selectedLanguage].dates.months[new Date(`${show[1]}/${show[2]}/${show[0]}`).getMonth()]
      const day = languageData[selectedLanguage].dates.days[new Date(`${show[1]}/${show[2]}/${show[0]}`).getDay()]
      const title = selectedLanguage === 'en' ? show[4] : show[5];
      return (
        <div className="showsBox pastShows" key={i}>
          <div className="showsLeft">
            <p>{show[0]} - {month} {show[2]} ({day}) at {show[3]}</p>
          </div>
          <div className="showsRight">
            <p>{title} @{show[6]}</p> 
            {/* <div><a href={show[7]} target="_blank" rel="noreferrer">{infoText}</a></div> */}
            {/* <img src={showsjuanpa} alt="juanpa playing guitar" /> */}
          </div>
        </div>
      );
    });
  };

  return <div id="shows" ref={props.reference} className="beforeEntry">
    <h1>{languageData[selectedLanguage].shows[1]}</h1>
    {renderUpcomingShows()}
    <h2>{languageData[selectedLanguage].shows[2]}</h2>
    {renderPastShows()}
    </div>;
};

export default Shows;
