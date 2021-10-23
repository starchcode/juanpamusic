import React from "react";

import "./css/music.css";
import { useSelector } from "react-redux";
import MusicBox from './MusicBox';
import { FadeInHandler } from "../hooks/AnimationNavigation";


const Music = (props) => {
  const selectedLanguage = useSelector(state => state.selectedLanguage.lan);

  FadeInHandler(props.reference) 

  const renderMusic = () => {
    return props.data.music.map((data, i) => {
      return <MusicBox key={i} data={data} i={i} lan={selectedLanguage}/>
    });
  }
  
    if (!props.data) return "loading: music not ready...";

    return <div id="Music" className="beforeEntry" ref={props.reference}>{renderMusic()}</div>;
  
}

export default Music;
