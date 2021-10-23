import { useEffect } from "react";
import history from "../history";
// import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const LanguageHandler = (selectedLanguage, languageChange) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // console.log(history)

  const urlLanguageCheck = (selectedLanguage, languageChange) => {
    console.log("URL language after first mount called");
    const urlPathname = window.location.pathname;
    const browserStorage = window.localStorage.getItem("lan");

    const doesItInclude = urlPathname.match(/e[ns]/);
    const doesItStartWith = urlPathname.match(/^\/e[ns]/);
    if (urlPathname === "/" && browserStorage) {
      dispatch(languageChange(browserStorage));
      return;
    }

    if (!doesItInclude && browserStorage) {
      console.log("SEE?");
      dispatch(languageChange(browserStorage));
      history.push(`/${browserStorage}/notfound`);
      return;
    }

    //if localstorage is empty
    if (urlPathname.length > 1 && !doesItInclude) {
      dispatch(languageChange("en"));
      history.push("/en/notfound");
    }

    if (!doesItInclude) return;

    const urlLanguage = doesItInclude[0];

    if (doesItStartWith && selectedLanguage !== urlLanguage)
      dispatch(languageChange(urlLanguage));
  };

  const languageCheck = (selectedLanguage) => {
    const urlPathname = window.location.pathname;
    const doesItInclude = urlPathname.match(/e[ns]/);

    // if (selectedLanguage && !doesItStartWith && urlPathname.length < 5) {
    if (selectedLanguage && urlPathname === '/') {
      console.log("languageCheck 1st condition");
      history.push(`/${selectedLanguage}/home`);
    }

    if (
      selectedLanguage &&
      doesItInclude &&
      doesItInclude[0] !== selectedLanguage
    ) {
      // console.log('languageCheck 2nd condition')
      const regex = new RegExp(doesItInclude[0]);
      const newHistory = urlPathname.replace(regex, selectedLanguage);
      history.push(newHistory);
    }
  };





  useEffect(() => {
    // console.log('LanguageHandler Mounted')
    urlLanguageCheck(selectedLanguage, languageChange);
  }, []);

  useEffect(() => {
    // console.log('LanguageHandler hook updated')
    languageCheck(selectedLanguage);
  });
};

export default LanguageHandler;
