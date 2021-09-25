import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./css/header.css";

import logo from '../media/logo.png'

class Header extends React.Component {

  render() {
    return (
      <div id="header">
        <img src={logo} />
        <ul>
          <li>
            {" "}
            <Link to={`/${this.props.selectedLanguage}/home`}>Home</Link>
          </li>
          <li>
            {" "}
            <Link to={`/${this.props.selectedLanguage}/biography`}>Biography</Link>
          </li>
          <li>
            {" "}
            <Link to={`/${this.props.selectedLanguage}/home`}>Music</Link>
          </li>
          <li>
            {" "}
            <Link to={`/${this.props.selectedLanguage}/home`}>Shows</Link>
          </li>
          <li>
            {" "}
            <Link to={`/${this.props.selectedLanguage}/home`}>Contact</Link>
          </li>
        </ul>

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