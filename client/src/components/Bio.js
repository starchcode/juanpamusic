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
                    <p>{bioTextEn}</p>
                    <br />
                    <p>{bioTextEn_2}</p>
                </div>
            </div>
        )
    }
}

export default Bio;