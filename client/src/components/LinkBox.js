import React from "react";
// import applelogo from "../media/applelogo.png";
import "./css/linkBox.css";
import loader from "../media/loader.jpg";
import Image from "./Image";
import ScrollToTop from "./ScrollToTop";


    const LinkBox = ({data, lan}) => {

    return (
      <React.Fragment>
        <ScrollToTop />
        <div id="linkBox" key='a'>
          <div>
            <Image 
          src={data[0]}
          alt="artwork"
          initClasses="musicimg"
          classesToAdd="loaded"
          />
            {/* <img src="https://i.ibb.co/1rXCVHf/OLYMPUS-DIGITAL-CAMERA.jpg" loading="lazy" className="loader" alt="default artwork"/> */}
            {/* <img src={require('../media/loader.jpg').default} loading="lazy" className="loader" alt="default artwork"/> */}
            <img
              src={loader}
              loading="lazy"
              className="linkImgLoader"
              alt="default artwork"
            />
          </div>
          <div className="data">
            <a href={data[1]}>Link</a>
            <p>{lan === 'en' ? data[2]: data[3]}</p>
          </div>
        </div>
      </React.Fragment>
    );
}

export default LinkBox;
