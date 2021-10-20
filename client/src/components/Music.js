import React from "react";

import "./css/music.css";

import MusicBox from './MusicBox';


class Music extends React.Component {

  renderMusic() {
    return this.props.data.music.map((data, i) => {
      return <MusicBox key={i} data={data} i={i} lan={this.props.lan}/>
    });
  }
  render() {
    if (!this.props.data) return "Loading...";

    return <div id="Music">{this.renderMusic()}</div>;
  }
}

export default Music;
