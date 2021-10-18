import React from 'react';

import './css/music.css';

import applelogo from '../media/applelogo.png'
import spotifylogo from '../media/spotifylogo.png'
import bandcamplogo from '../media/bandcamplogo.png'

class Music extends React.Component {

renderMusic () {
    // console.log(this.props.data.music)
    return this.props.data.music.map((data, i) => {

        return (
            <div className="musicBox" key={i}>
                <div><img src={data[0]} /></div>
                <div>
                    <h3>{data[1]}</h3>
                    <p>Released on {data[3]}</p>
                    <div className="musiclinks">
                        <a href={data[4]}><img src={bandcamplogo} /></a>
                        <div>
                        <a href={data[5]}><img src={applelogo} /></a>
                        <a href={data[6]} target="_blank"><img src={spotifylogo} /></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

}
    render(){
        if(!this.props.data) return 'Loading...';
        
        return(
            <div id="Music">
                {this.renderMusic()}
            </div>
        )
    }
}

export default Music;