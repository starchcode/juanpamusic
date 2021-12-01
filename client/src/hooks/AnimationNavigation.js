import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const NavigationHandler = (
  elements,
  mainElement,
  fadein = "fadein",
  fadeout = "fadeout",
  noProceed = "shake"
) => {

  const history = useHistory();
  let shouldProceed = false;

  const fadeinHandler = () => {
    setTimeout(() => {
      let newElement = elements.find((el) => el.current);
      newElement.current.classList.add(fadein);
    }, 0);
  };

  useEffect(() => {
    fadeinHandler();
  }, []);



  const handleNavigation = (newLocation) => {
    newLocation = newLocation.toLowerCase();
    let toRemoveElement = elements.find((el) => el.current);
    if (!toRemoveElement) {
      //to avoid proceeding in case element is undefined(loading)
      return; 
    }
    if (window.location.pathname.toLowerCase() === newLocation) {
      //DO NOT PROCEED, if we are at target location
      //Also adding a class 
      // !mainElement.current.classList.contains(noProceed)
      if(!shouldProceed){
        shouldProceed = true;
        mainElement.current.classList.add(noProceed);
        console.log('class added');
        mainElement.current.addEventListener('animationend', ()=>{
        // mainElement.current.addEventListener('transitionend', ()=>{
          mainElement.current.classList.remove(noProceed);
          shouldProceed = false;
          console.log('class removed');
          mainElement.current.removeEventListener('transitionend', this);
        })
      }
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
