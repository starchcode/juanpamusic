import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector } from "react-redux";

// import NavigationAnimation from "../hooks/NavigationAnimation";
import { MenuSmoothAnimation } from "../hooks/AnimationNavigation";

import "./css/header.css";

import logo from "../media/logo.png";
import { languageData } from "./languageFile/languageFile";

const Header = (props) => {
  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);

  const [handleNav] =  MenuSmoothAnimation(props.components);

  const menuButtons = () => {
    return (
      <ul>
        {languageData[selectedLanguage].menu.map((menuButton, i) => {

          return (
            <li key={i}>
              {/* onClick={()=>handleNavigation(`${selectedLanguage}/shows`)} */}
              <div onClick={()=> handleNav(`${selectedLanguage}/${menuButton}`)}>
                {menuButton}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  // console.log('header prop components: ', props.components);
  return (
    <div id="header">
      <img src={logo} alt="logo of juanpa music" />
      {menuButtons()}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     selectedLanguage: state.selectedLanguage.lan
//   }
// }
export default Header;
