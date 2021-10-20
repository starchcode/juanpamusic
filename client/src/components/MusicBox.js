import React from "react";
import applelogo from "../media/applelogo.png";
import spotifylogo from "../media/spotifylogo.png";
import bandcamplogo from "../media/bandcamplogo.png";

import "./css/music.css";
import { languageData } from "./languageFile/languageFile";
import loader from "../media/loader.jpg";

class MusicBox extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  showImage = () => {
    this.imgRef.current.className = this.imgRef.current.className + " loaded";
  };
  componentDidMount() {
    this.imgRef.current.addEventListener("load", this.showImage);
  }
componentWillUnmount() {
  this.imgRef.current.removeEventListener("load", this.showImage);
}

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
        console.log('if passed');
      date = languageData[this.props.lan].music[0] + month + " " + day + ", " + this.props.data[3];
    } else if (this.props.lan === "es") {
        const firstWord = languageData[this.props.lan].music[0];
        const prep = languageData[this.props.lan].music[1];
      date = firstWord + day + ' ' + prep + month + prep + year;
    }

    return (
      <div className="musicBox" key={this.props.i}>
        <div>
          <img
            ref={this.imgRef}
            src={this.props.data[0]}
            loading="lazy"
            className="musicimg"
          />
          <img src={loader} loading="lazy" className="loader" />
        </div>
        <div>
          <h3>{this.props.data[1]}</h3>
          <p>{date}</p>
          <div className="musiclinks">
            <div>
              <a href={this.props.data[6]} target="_blank">
                <img src={bandcamplogo} />
              </a>
            </div>
            <div>
              <a href={this.props.data[7]} target="_blank">
                <img src={applelogo} />
              </a>
              <a href={this.props.data[8]} target="_blank">
                <img src={spotifylogo} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicBox;
