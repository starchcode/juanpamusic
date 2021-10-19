import React from "react";

import "./css/shows.css";

import showsjuanpa from "../media/showsjuanpa.jpg";

const Shows = (props) => {
  const renderShows = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    console.log(days[new Date("10/23/2021").getDay()]);

    console.log(props.data.shows);
    return props.data.shows.map((show, i) => {
      return (
        <div className="showsBox" key={i}>
          <div className="showsLeft">
            <p>{months[new Date(`${show[1]}/${show[2]}/${show[0]}`).getMonth()]} - {show[0]}</p>
            <p>{show[2]}</p>
            <p>{days[new Date(`${show[1]}/${show[2]}/${show[0]}`).getDay()]}</p>
            <p>19:00</p>
          </div>
          <div className="showsRight">
            <p>{show[4]}</p> 
            <div>Info / Tickets</div>
            <img src={showsjuanpa} />
          </div>
        </div>
      );
    });
  };
  if (!props.data) return "Loading...";
  return <div id="shows">{renderShows()}</div>;
};

export default Shows;
