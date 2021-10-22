import { useEffect } from "react";
import { useSelector } from "react-redux";
import history from "../history";

const NavigationAnimation = (element) => {
    const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);

    useEffect(() => {
        if (element.current && !element.current.classList.contains("fadein")) {
          setTimeout(() => {
            element.current.classList.add("fadein");
          }, 0);
        }
      }, [element.current]);

  const handleNavigation = (newLocation) => {
      console.log('handleNav fired!');
    const historyPush = () => {
      element.current.removeEventListener("animationend", this);
      history.push(`/${selectedLanguage}/${newLocation}`);
    };
    //   console.log(element)
    element.current.addEventListener("animationend", historyPush);

    element.current.classList.toggle("fadeout");
  };

  return [handleNavigation];
};

export default NavigationAnimation;
