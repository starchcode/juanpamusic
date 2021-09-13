import React, { useState } from "react";
import './css/welcome.css';

const Welcome = () => {
const [hide, setHide] = useState(true)
const handler = e => {
    return e.key === '~' ? setHide(!hide): null;
}
    return (
        <div onKeyPress={(e) => handler(e)} className={`welcome + ${hide ? "hideme" : ""}`} tabIndex='0'>
            <h1>Welcome to JuanpaMusic.com</h1>
            <h3>The website will be lunched soon</h3>
        </div>
    )
}

export default Welcome;