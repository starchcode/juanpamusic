import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./css/header.css";

import logo from '../media/logo.png'
import { languageData } from "./languageFile/languageFile";

class Header extends React.Component {

menuButtons () {
  return(
    <ul>
      {languageData[this.props.selectedLanguage].menu.map((menuButton, i) => {
        return(
          <li>
          <Link to={`/${this.props.selectedLanguage}/${languageData['en'].menu[i]}`}>{menuButton}</Link>
        </li>
        )
      })}
    </ul>
  )
}
  render() {
    return (
      <div id="header">
        <img src={logo} alt="logo of juanpa music"/>
        {this.menuButtons()}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLanguage: state.selectedLanguage.lan
  }
}
export default connect(mapStateToProps, { } )(Header);