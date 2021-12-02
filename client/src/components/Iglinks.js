import React, { useEffect } from "react";
// import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getIglinksData } from '../actions/index';

import { NavigationHandler } from "../hooks/AnimationNavigation";
import "./css/iglinks.css";
import LinkBox from "./LinkBox";

const Iglinks = (props) => {
  // const [handleNav] = NavigationHandler(props.components);
  NavigationHandler([props.reference]); //to fadein

  const selectedLanguage = useSelector((state) => state.selectedLanguage.lan);
  const iglinksdata = useSelector((state) => state.iglinksdata.response);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIglinksData());
  }, [])


  const renderLink = () => {
    if(!iglinksdata) return 'Please wait...';
    return iglinksdata.map((data, i) => {
      return <LinkBox key={i} data={data} i={i} lan={selectedLanguage} />;
    });
  };

//   if(!data) return 'Loading';

  return (
      <React.Fragment>
      <div id="iglinks" className="beforeEntry" ref={props.reference}>
        <h3 style={{flex: '1 100%', padding: '20px 0 10px 0', fontStyle: 'italic'}}>Instagram Links</h3>
        {renderLink()}
      </div>

      </React.Fragment>

  );
};

export default Iglinks;
