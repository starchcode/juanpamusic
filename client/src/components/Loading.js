import React from "react";
import { useReducer } from "react";
import './css/loading.css'

const Loading = () => {
    const selectedLanguage = useReducer(state => state.selectedLanguage.lan)
    return(
        <div id='loader'>
            <h1 id='headingLoader'>Loading...</h1>
        </div>
    )
}

export default Loading;