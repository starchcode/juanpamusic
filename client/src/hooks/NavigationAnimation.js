import { useEffect } from "react";
import history from "../history";

const NavigationAnimation = (element) => {

    useEffect(() => {
        if (element.current && !element.current.classList.contains("fadein")) {
          console.log('fade in is being added!');
          setTimeout(() => {
            element.current.classList.add("fadein");
          }, 0);
        }
      }, [element.current]);

  const handleNavigation = (newLocation) => {
      console.log('handleNav fired!');
    const historyPush = () => {
      element.current.removeEventListener("animationend", this);
      history.push(`/${newLocation}`);
    };
    //   console.log(element)
    element.current.addEventListener("animationend", historyPush);

    element.current.classList.toggle("fadeout");
  };

  return [handleNavigation];
};

export default NavigationAnimation;
