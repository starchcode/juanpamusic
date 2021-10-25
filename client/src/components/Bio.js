import React from "react";
import "./css/bio.css";
import juanpapic2 from "../media/juanpapic2.jpg";
import Image from "./Image";

class Bio extends React.Component {
  render() {
    return (
      <div id="bio">
        <div className="bioImage">
          <Image
            src={juanpapic2}
            alt="another pic of juanpa"
            initClasses="beforeEntry"
            classesToAdd="fadein"
          />
        </div>
        <div className="bioText">
          <h2>Biography</h2>
          <br />
          <p>
            {this.props.lan === "en" ? this.props.data[2] : this.props.data[4]}
          </p>
          <br />
          <p>
            {this.props.lan === "en" ? this.props.data[3] : this.props.data[5]}
          </p>
        </div>
      </div>
    );
  }
}

export default Bio;
