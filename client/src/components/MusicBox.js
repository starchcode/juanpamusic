import React from "react";
import applelogo from "../media/applelogo.png";
import spotifylogo from "../media/spotifylogo.png";
import bandcamplogo from "../media/bandcamplogo.png";

import "./css/music.css";
import loader from '../media/loader.jpg';

class MusicBox extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

   showImage = () => {
    console.log('loaded');
    console.log('height: ', this.imgRef.current.clientHeight)
    console.log('class before: ', this.imgRef.current.className)
    this.imgRef.current.className = this.imgRef.current.className + ' loaded'
    console.log('className after: ', this.imgRef.current.class)

  }
  componentDidMount() {
    this.imgRef.current.addEventListener('load', this.showImage);
  }
  
  render() {
    return (
      <div className="musicBox" key={this.props.i}>
        <div>
          <img ref={this.imgRef} src={this.props.data[0]} loading="lazy" className='musicimg' />
          <img src={loader} loading="lazy" className="loader" />
        </div>
        <div>
          <h3>{this.props.data[1]}</h3>
          <p>Released on {this.props.data[3]}</p>
          <div className="musiclinks">
            <div>
              <a href={this.props.data[4]} target="_blank">
                <img src={bandcamplogo} />
              </a>
            </div>
            <div>
              <a href={this.props.data[5]} target="_blank">
                <img src={applelogo} />
              </a>
              <a href={this.props.data[6]} target="_blank">
                <img src={spotifylogo} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicBox;
