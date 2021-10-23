import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { useSelector } from "react-redux";

// import NavigationAnimation from "../hooks/NavigationAnimation";
import { NavigationHandler } from "../hooks/AnimationNavigation";

import "./css/header.css";

import logo from "../media/logo.png";
import { languageData } from "./languageFile/languageFile";

const Header = (props) => {
  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);

  const [handleNav] =  NavigationHandler(props.components);

  const menuButtons = () => {
    return (
      <ul>
        {languageData[selectedLanguage].menu.map((menuButton, i) => {
          const pathToGo = languageData['en'].menu[i];

          if(pathToGo === 'Biography' || pathToGo === 'Contact'){
            console.log('current button: ', menuButton);
            return (
              <li key={i}>
              {/* onClick={()=>handleNavigation(`${selectedLanguage}/shows`)} */}
              <div onClick={()=> {
                handleNav(`/${selectedLanguage}/home`)
                setTimeout(() => {
                  // console.log('navigated!', props.components[0].current.children.bio.scrollIntoView({behavior: 'smooth', block: 'start'}))
                  if(menuButton === 'Biography' && props.components[0].current){
                    props.components[0].current.children.bio.scrollIntoView({behavior: 'smooth', block: 'end'})
                  }else{
                    props.components[0].current.children.contactSection.scrollIntoView({behavior: 'smooth', block: 'end'})
                  }
                }, 300);
              }}>
                {menuButton}
              </div>
            </li>
            )
          }

          return (
            <li key={i}>
              {/* onClick={()=>handleNavigation(`${selectedLanguage}/shows`)} */}
              <div onClick={()=> handleNav(`/${selectedLanguage}/${pathToGo}`)}>
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
