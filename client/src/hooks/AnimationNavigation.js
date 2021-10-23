import { useEffect } from "react";
import { useHistory } from "react-router";

// import history from "../history";

export const FadeInHandler = (element, classToAdd = "fadein") => {
  useEffect(() => {
      //add fadein when component loads
      setTimeout(() => {
        if(element.current){
        element.current.classList.add(classToAdd);
      } 
      }, 0);
  });
};

export const NavigationHandler = (elements, classToAdd = "fadeout") => {
  console.log(elements);
  const history = useHistory();
  const handleNavigation = (newLocation) => {
    newLocation = newLocation.toLowerCase();
    let toRemoveElement = elements.find((el) => el.current);
    console.log('you should see')
    console.log(toRemoveElement)
    if (!toRemoveElement) return; //to avoid proceeding in case element is undefined(loading)
    console.log('SEE?')
    // console.log(window.location.pathname.toLowerCase(), newLocation)
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
