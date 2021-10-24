import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./css/music.css";
import MusicBox from './MusicBox';


const Music = (props) => {
  const selectedLanguage = useSelector(state => state.selectedLanguage.lan);
  const disography = useSelector(state => state.adminData.response.music);

useEffect(() => {
  console.log('Music DID Mount')
}, [])

 const renderMusic = () => {
    return disography.map((data, i) => {
      return <MusicBox key={i} data={data} i={i} lan={selectedLanguage}/>
    });
  }
    return <div id="music" className="beforeEntry" ref={props.reference}>{renderMusic()}</div>;
  
}

export default Music;
