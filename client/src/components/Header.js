import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationHandler } from "../hooks/AnimationNavigation";
import { languageData } from "./languageFile/languageFile";
import "./css/header.css";
import logo from "../media/logo.png";

const Header = (props) => {
  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);
  const [handleNav] = NavigationHandler(props.components, props.mainComponent);

  const menuButtons = () => {
    return (
      <ul>
        {languageData[selectedLanguage].menu.map((menuButton, i) => {
          const pathToGo = languageData["en"].menu[i];

          if (pathToGo === "Biography" || pathToGo === "Contact") {
            return (
              <li key={i}>
                <div
                  onClick={() => {
                    handleNav(`/${selectedLanguage}/home`);
                    setTimeout(() => {
                      if (
                        pathToGo === "Biography" &&
                        props.components[0].current
                      ) {
                        props.components[0].current.children.bio.scrollIntoView(
                          { behavior: "smooth", block: "end" }
                        );
                      } else if(
                        pathToGo === "Contact" &&
                        props.components[0].current
                      ) {
                        props.components[0].current.children.contactSection.scrollIntoView(
                          { behavior: "smooth", block: "end" }
                        );
                      }
                    }, 300);
                  }}
                >
                  {menuButton}
                </div>
              </li>
            );
          }

          return (
            <li key={i}>
              <div
                onClick={() => handleNav(`/${selectedLanguage}/${pathToGo}`)}
              >
                {menuButton}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div id="header">
      <img src={logo} onClick={() => handleNav(`/${selectedLanguage}/home`)} alt="logo of juanpa music" />
      {menuButtons()}
    </div>
  );
};

export default Header;
