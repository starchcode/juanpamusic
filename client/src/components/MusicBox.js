import React from "react";
import { languageData } from "./languageFile/languageFile";
import applelogo from "../media/applelogo.png";
import spotifylogo from "../media/spotifylogo.png";
import bandcamplogo from "../media/bandcamplogo.png";
import "./css/music.css";
import loader from "../media/loader.jpg";
import Image from "./Image";

class MusicBox extends React.Component {

  render() {
    const day = this.props.data[5];
    const year = this.props.data[3];
    const month =
      languageData[this.props.lan].dates.months[
        new Date(
          `${this.props.data[4]}/${day}/${year}`
        ).getMonth()
      ];
      let date;
    if (this.props.lan === "en") {
      date = languageData[this.props.lan].music[0] + month + " " + day + ", " + this.props.data[3];
    } else if (this.props.lan === "es") {
        const firstWord = languageData[this.props.lan].music[0];
        const prep = languageData[this.props.lan].music[1];
      date = firstWord + day + ' ' + prep + month + ' ' + prep + year;
    }

    return (
      <div className="musicBox" key={this.props.i}>
        <div>
          <Image 
          src={this.props.data[0]}
          alt="artwork"
          initClasses="musicimg"
          classesToAdd="loaded"
          />
          <img src={loader} loading="lazy" className="loader" alt="default artwork"/>
        </div>
        <div>
          <h3>{this.props.lan === 'en' ? this.props.data[1] : this.props.data[2]}</h3>
          <p>{date}</p>
          <div className="musiclinks">
            <div>
            <a href={this.props.data[6]} target="_blank"rel="noreferrer">
                <img src={bandcamplogo} alt="bandcamp logo" />
              </a>
              <a href={this.props.data[7]} target="_blank"rel="noreferrer">
                <img src={applelogo} alt="apple music logo" />
              </a>
              <a href={this.props.data[8]} target="_blank"rel="noreferrer">
                <img src={spotifylogo} alt="spotify logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicBox;
