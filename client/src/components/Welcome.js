import React, { useState } from "react";
import './css/welcome.css';

const Welcome = () => {
const [hide, setHide] = useState(false)
const handler = e => {
    return e.key === '~' ? setHide(!hide): null;
}
    return (
        <div onKeyPress={(e) => handler(e)} className={`welcome + ${hide ? "hideme" : ""}`} tabIndex='0'>
            <h1>Welcome to JuanpaMusic.com</h1>
            <p>The website will be lunched soon</p>
        </div>
    )
}

export default Welcome;