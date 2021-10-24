import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const NavigationHandler = (
  elements,
  oneEl,
  fadein = "fadein",
  fadeout = "fadeout"
) => {

  const history = useHistory();

  const fadeinHandler = () => {
    setTimeout(() => {
      let newElement = elements.find((el) => el.current);
      newElement.current.classList.add(fadein);
    }, 0);
  };

  useEffect(() => {
    console.log("AnimationNavigation DID MOUNT");
    fadeinHandler();
  }, []);



  const handleNavigation = (newLocation) => {
    newLocation = newLocation.toLowerCase();
    let toRemoveElement = elements.find((el) => el.current);
    console.log("Will remove", toRemoveElement);
    if (!toRemoveElement) return; //to avoid proceeding in case element is undefined(loading)
    if (window.location.pathname.toLowerCase() === newLocation) {
      //DO NOT PROCEED, if we are at target location
      return;
    }

    const historyPush = () => {
      history.push(`${newLocation}`);
      fadeinHandler();
    };

    toRemoveElement.current.addEventListener("animationend", historyPush);
    toRemoveElement.current.classList.add(fadeout);
  };

  return [handleNavigation];
};
