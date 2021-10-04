import React from "react";
import { connect } from "react-redux";
import { languageChange } from "../actions";
import "./css/languageSelect.css";
import juanpavideo from '../media/juanpavideo.mp4';

class LanguageSelect extends React.Component {
  constructor(props){
    super(props);
    this.vidRef = React.createRef();
  }
componentDidMount() {
  this.vidRef.current.addEventListener('load', this.videoHandle())
}
videoHandle = () => {
  this.vidRef.current.volume = 0.05;
}
  render() {
    return (

      <div id="languageSelect">
        <h1>Welcome to Juanpa Music!</h1>
        <h3>Please select your preferred language</h3>
        <br />
        <h1>Bienvenido a Juanpa musica!</h1>
        <h3>Por favor seleccione su idioma preferido</h3>
        <br />
        <div className="buttons">
          <button onClick={() => this.props.languageChange("en")}>English</button>
          <button onClick={() => this.props.languageChange("es")}>Español</button>
        </div>
        <video 
        ref={this.vidRef}
        autoPlay
        loop

        >
          <source src={juanpavideo} type="video/mp4"/>
        </video>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedLanguage }) => {
  return {
    selectedLanguage: selectedLanguage.lan,
  };
};

export default connect(mapStateToProps, { languageChange })(LanguageSelect);
