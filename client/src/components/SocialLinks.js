import React from "react";
import './css/socialLinks.css';

import spotify from "../media/spotify.svg";
import ig from "../media/ig.svg";
import fb from "../media/fb.svg";
import yt from "../media/yt.svg";

const SocialLinks = (props) => {
  const links = {
    spotify:
      "https://open.spotify.com/artist/73nhDjV35w27LbOT1e9Gv5?si=o_qc4j-OTqqsbmn2ScSefA",
    facebook: "https://www.facebook.com/juanpaguitarmusic",
    instagram: "https://www.instagram.com/pambilia",
    youtube: "https://www.youtube.com/pambilia",
  };

  const socialLinkHandle = (e) => {
    if (links[e.target.alt]) window.open(links[e.target.alt]);
  };

  return (
    <div id="social_links" onClick={(e) => socialLinkHandle(e)}>
      <img src={spotify} alt="spotify" />
      <img src={ig} alt="instagram" />
      <img src={fb} alt="facebook" />
      <img src={yt} alt="youtube" />
    </div>
  );
};

export default SocialLinks;
