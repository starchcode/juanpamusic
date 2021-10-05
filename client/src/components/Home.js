import React from 'react';
import { languageData } from './languageFile/languageFile';
import { connect } from 'react-redux';

import './css/home.css';
import SocialLinks from './SocialLinks';
import Bio from './Bio';
import ContactForm from './ContactForm';

import juanpapic1 from '../media/juanpapic1.jpg'


const ytID = 'cUCko5nDLVI'
class Home extends React.Component {

    render(){
        const callToActionText = languageData[this.props.selectedLanguage].menu;
        const contactText = languageData[this.props.selectedLanguage].contact.text
        return (
            <div id="home">
                <div id="homeBG"></div>
                <div id="juanpapic1"><img src={juanpapic1} alt='juanpa playing guitar' /></div>
                <div id="home_main">
                
                <iframe title='spotify playlist' id="spotify" src="https://open.spotify.com/embed/playlist/7t7eU85sSDHaw0ZAj9SXro" width="250" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${ytID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div id="home_linkBox">
                    <h1 className="whiteBG">{callToActionText[2]}</h1>
                    <h1 className="whiteBG">{callToActionText[3]}</h1>
                    <SocialLinks />
                </div>
                </div>
                <Bio />
                <div id="contactSection">
                    <div id="contactText">
                        <h2>{contactText[0]}</h2>
                        <p>{contactText[1]}</p>
                        <p>{contactText[2]}</p>
                        <a href="mailto: juanpapilla@hotmail.com">juanpapilla [at] hotmail.com</a>
                    </div>
                    <ContactForm />
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ selectedLanguage }) => {
    return {
        selectedLanguage: selectedLanguage.lan
    }
}
export default connect(mapStateToProps, null)(Home);
