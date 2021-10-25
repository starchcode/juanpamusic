import React from "react";
import { useSelector } from "react-redux";
import './css/footer.css';
import SocialLinks from "./SocialLinks";
import { languageData } from "./languageFile/languageFile";

const Footer = () => {
const selectedLanguage = useSelector(state => state.selectedLanguage.lan)
    
    return <div id="footer">
      <SocialLinks />
      <small className='copyright'>
          <a href="https://starchcode.com" target="_blank">
            {languageData[selectedLanguage].footer[0]}
          </a>
        </small>
      </div>;

}
export default Footer;