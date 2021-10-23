import { useEffect } from "react";
import history from "../history";

export const FadeInHandler = (element, classToAdd = "fadein") => {
  useEffect(() => {
    if (element.current && !element.current.classList.contains(classToAdd)) {
      //add fadein when component loads
      setTimeout(() => {
        element.current.classList.add(classToAdd);
      }, 0);
    }
  });
};

export const NavigationHandler = (elements, classToAdd = "fadeout") => {
  const handleNavigation = (newLocation) => {
    newLocation = newLocation.toLowerCase();
    let toRemoveElement = elements.find((el) => el.current);

    if (!toRemoveElement) return; //to avoid proceeding in case element is undefined(loading)

    if (window.location.pathname.toLowerCase() === newLocation) {
      //DO NOT PROCEED, if we are at target location
      return;
    }

    const historyPush = () => history.push(`${newLocation}`);

    toRemoveElement.current.addEventListener("animationend", historyPush);
    toRemoveElement.current.classList.add(classToAdd);
  };

  return [handleNavigation];
};
