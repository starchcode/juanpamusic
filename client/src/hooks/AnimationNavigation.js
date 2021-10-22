import { useEffect } from "react";
import history from "../history";


export const FadeInHandler = (element) => {
    
  
  useEffect(() => {
        console.log('rendering');
        if (element.current && !element.current.classList.contains("fadein")) {
            //add fadein when component loads
          setTimeout(() => {
            element.current.classList.add("fadein");
          }, 0);
        }
      });
  return true;
};


export const MenuSmoothAnimation = (elements) => {

  const handleNavigation = (newLocation) => {
      let toRemoveElement = elements.find((el) => el.current);
      console.log('current element to be Removed: ', toRemoveElement);

      if(!toRemoveElement) return; //to avoid proceeding in case element is undefined(loading)

    if(newLocation.toLowerCase().includes(toRemoveElement.current.id.toLowerCase())){
        //if we are at target component and path DO NOT PROCEED
        return;
    }

    const historyPush = () => {
    if(!toRemoveElement.current) return; //when new menu double clicked DO NOT PROCEED
      toRemoveElement.current.removeEventListener("animationend", this);
      history.push(`/${newLocation}`);
    };

    toRemoveElement.current.addEventListener("animationend", historyPush);
    toRemoveElement.current.classList.add("fadeout");
  };

  return [handleNavigation];
};

