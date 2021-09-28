import React from "react";
import { connect } from "react-redux";
import { languageChange } from "../actions";
import "./css/language.css"

import ukus from '../media/ukus.png';
import es from '../media/es.png';

class Language extends React.Component {
    languageHandler(lan) {
        this.props.languageChange(lan);
      }
  render() {
    return (
      <div id="language">
          
        <div onClick={() => this.languageHandler("en")}><img src={ukus} alt='uk and us flag' /></div>
        <div onClick={() => this.languageHandler("es")}><img src={es} alt='spain flag'/></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedLanguage: state.selectedLanguage.lan };
};

export default connect(mapStateToProps, { languageChange })(Language);
