import React from "react";


const Error = (props) => {
    return(
        <div className="message main">
            <h1>Oops!</h1>
            <p>{props.message}</p>
            <p>Try to refresh the page in a few seconds or contact webmaster</p>
            </div>

    )
}

export default Error;