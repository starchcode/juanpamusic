import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { contactServer, languageChange } from "../actions";
import history from "../history";
import "./css/app.css";

import Header from "./Header";
import LanguageSelect from "./LanguageSelect";
import Welcome from "./Welcome";
import Home from "./Home";
import NotFound from "./NotFound";

const Temp = (props) => {
  return (
    <div className="overlay">
      <div>Welcome to Juanpa Music</div>
      <div>Language: {props.lan}</div>
      <br />
      <div>{props.state}</div>
      <div>
        {'This is response from backend server "' + props.serverResponse + '"'}
      </div>
    </div>
  );
};



const languageCheck = (selectedLanguage, languageChange) => {

  if(selectedLanguage && !window.location.pathname.match(/e[ns]/)) history.push(`/${selectedLanguage}`)
  if (selectedLanguage &&  window.location.pathname.match(/e[ns]/) && window.location.pathname.match(/e[ns]/)[0] !== selectedLanguage) {
    console.log(
      'Trying to match "URL" with "selected Language" and "urlLanguage" = ',
      window.location.pathname,
      selectedLanguage,
      window.location.pathname.match(/e[ns]/)[0]
    );

      console.log("URL and Lan are not match.", window.location.pathname, selectedLanguage);
      const regex = new RegExp(window.location.pathname.match(/e[ns]/)[0]);
      const newHistory = window.location.pathname.replace(regex, selectedLanguage)
      console.log('newHistory is', newHistory);
      history.push(newHistory)
  }


  if (selectedLanguage &&  window.location.pathname === '/') history.push(`/${selectedLanguage}`)


  if (!window.location.pathname.match(/e[ns]/)) return;
  const urlLanguage = window.location.pathname.match(/e[ns]/)[0];

  console.log(
    "CDU. Current path: ",
    window.location.pathname
  );  

};

class App extends React.Component {
  urlLanguageCheck(selectedLanguage, languageChange) {
    //TODO: if it's an address like: /en/home
    // if (!/^(\/en|\/es)/.test(window.location.pathname)) {
    if (window.location.pathname.length > 1 && !/^(\/en|\/es)/.test(window.location.pathname)) {
      console.log("404: URL NOT FOUND!");
      history.push("/notfound");
    }
    if (!window.location.pathname.match(/e[ns]/)) return;
    console.log("urlLanguageCheck");
    //TODO: if it's de..?
    const urlLanguage = window.location.pathname.match(/e[ns]/)[0];

    if (
      /^(\/en|\/es)/.test(window.location.pathname) &&
      selectedLanguage !== urlLanguage
    ) {
      console.log(
        "will select 'Language' based on entered 'URL'",
        selectedLanguage,
        urlLanguage
      );
      languageChange(urlLanguage);
      // history.push(`/${urlLanguage}`);
      return;
    }



  }
  componentDidMount() {
    console.log("App Mounted for first time!");
    this.props.contactServer(); // get data from backend

    //if language is in URL add it to Redux
    this.urlLanguageCheck(
      this.props.selectedLanguage,
      this.props.languageChange
    );
  }
  componentDidUpdate(prevProps, prevState) {
    languageCheck(this.props.selectedLanguage, this.props.languageChange); //check each time that URL and selected language are a match
  }

  render() {
    console.log("app rendered. Lan is: ", this.props.selectedLanguage);
    if (!this.props.state || !this.props.serverResponse) return "Loading...";
    if (!this.props.selectedLanguage && window.location.pathname !== '/notfound') return <LanguageSelect />;
    return (
      <Router history={history}>
        <div>
          <Header />
          <Welcome />
          <Temp
            state={this.props.state}
            serverResponse={this.props.serverResponse}
            lan={this.props.selectedLanguage}
          />
          <Switch>
            <Route path="/:lan/home" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.noReducer,
    serverResponse: state.serverResponse.response,
    selectedLanguage: state.selectedLanguage.lan,
  };
};

export default connect(mapStateToProps, { contactServer, languageChange })(App);
