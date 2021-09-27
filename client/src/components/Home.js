import React from 'react';
import history from '../history';
import './css/home.css';
import juanpapic1 from '../media/juanpapic1.jpg'

const ytID = 'cUCko5nDLVI'
class Home extends React.Component {

    render(){
        return (
            <div id="#home">
                <div id="homeBG"></div>
                <div id="juanpapic1"><img src={juanpapic1} /></div>
                <div id="home_main">
                
                <iframe id="spotify" src="https://open.spotify.com/embed/playlist/7t7eU85sSDHaw0ZAj9SXro" width="250" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${ytID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div id="home_linkBox">
                    <h1 className="whiteBG">MUSIC</h1>
                    <h1 className="whiteBG">SHOWS</h1>
                </div>
                </div>
            </div>
        )
    }
}

export default Home;
