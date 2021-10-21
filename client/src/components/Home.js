import React from "react";
import { languageData } from "./languageFile/languageFile";
import { connect } from "react-redux";

import "./css/home.css";
import SocialLinks from "./SocialLinks";
import Bio from "./Bio";
import ContactForm from "./ContactForm";

import juanpapic1 from "../media/juanpapic1.jpg";
import history from "../history";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.homeRef = React.createRef();
  }

  historyPush = () => {
    history.push(`/${this.props.selectedLanguage}/music`);
  };
  componentDidMount() {
    if (this.homeRef.current) { 
      //when navigating event listener needs to be added ass well as when updating
      setTimeout(() => {
        this.homeRef.current.classList.add("fadein");
      }, 0);
      this.homeRef.current.addEventListener("animationend", this.historyPush);
    }
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.homeRef.current.classList.add("fadein");
    }, 0);
    this.homeRef.current.addEventListener("animationend", this.historyPush);
  }
  componentWillUnmount() {
    this.homeRef.current.removeEventListener("animationend", this.historyPush);
  }
  handleNavigation = () => {
    console.log("handleNavigation");
    this.homeRef.current.classList.toggle("fadeout");
    console.log(this.homeRef.current.classList);
  };

  render() {
    const callToActionText = languageData[this.props.selectedLanguage].menu;
    const contactText = languageData[this.props.selectedLanguage].contact.text;

    if (!this.props.adminData.response) return "Loading...";

    const ytID = this.props.adminData.response.home[0];
    const spotifyID = this.props.adminData.response.home[1];

    return (
      <div id="home" ref={this.homeRef}>
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
            <h1 onClick={this.handleNavigation} className="whiteBG">
              {callToActionText[2]}
            </h1>
            <h1 className="whiteBG">{callToActionText[3]}</h1>
            <SocialLinks />
          </div>
        </div>
        <Bio
          data={this.props.adminData.response.home}
          lan={this.props.selectedLanguage}
        />
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
  }
}

const mapStateToProps = ({ selectedLanguage, adminData }) => {
  return {
    selectedLanguage: selectedLanguage.lan,
    adminData: adminData,
  };
};
export default connect(mapStateToProps, null)(Home);
