import React from 'react';
import './css/bio.css';
import juanpapic2 from '../media/juanpapic2.jpg';

// HARDCODE
const bioTextEn = `Juanpaisanup-and-comingartisthailingfromSpain.
Hefellinlovewithrockmusicatanearly
age.Learningtoplaytheguitarshortlyafter
discoveringhissoon-to-becareergenre,Juanpahas
establishedhimselfasauniquetalentinthemusicJuanpaisanup-and-comingartisthailingfromSpain.
Hefellinlovewithrockmusicatanearly
age.Learningtoplaytheguitarshortlyafter
discoveringhissoon-to-becareergenre,Juanpahas
establishedhimselfasauniquetalentinthemusicJuanpaisanup-and-comingartisthailingfromSpain.
Hefellinlovewithrockmusicatanearly
age.Learningtoplaytheguitarshortlyafter
discoveringhissoon-to-becareergenre,Juanpahas
establishedhimselfasauniquetalentinthemusicJuanpaisanup-and-comingartisthailingfromSpain.`;
const bioTextEn_2 = `Hefellinlovewithrockmusicatanearly
age.Learningtoplaytheguitarshortlyafter
discoveringhissoon-to-becareergenre,Juanpahas
establishedhimselfasauniquetalentinthemusicJuanpaisanup-and-comingartisthailingfromSpain.
Hefellinlovewithrockmusicatanearly
age.Learningtoplaytheguitarshortlyafter
discoveringhissoon-to-becareergenre,Juanpahas
establishedhimselfasauniquetalentinthemusicc`

class Bio extends React.Component {

    render(){
        return(
            <div id="bio">
                <div className="bioImage">
                    <img src={juanpapic2} alt='another pic of juanpa' />
                </div>
                <div className="bioText">
                    <h2>Biography</h2>
                    <br />
                    <p>{this.props.lan === 'en' ? this.props.data[2]: this.props.data[4]}</p>
                    <br />
                    <p>{this.props.lan === 'en' ? this.props.data[3]: this.props.data[5]}</p>
                </div>
            </div>
        )
    }
}


export default Bio;