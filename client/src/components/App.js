import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { contactServer, languageChange } from "../actions";
import history from "../history";
import "./css/app.css";

import Welcome from "./Welcome";
import Home from "./Home";
import NotFound from "./NotFound";

const Temp = (props) => {
  return (
    <div className="overlay">
      <div>Welcome to Juanpa Music</div>
      <br />
      <div>{props.state}</div>
      <div>
        {'This is response from backend server "' + props.serverResponse + '"'}
      </div>
    </div>
  );
};

// let selectedLanguage = "en";

const URLCheck = (selectedLanguage, languageChange) => {
  if (!selectedLanguage){
    //TODO: initially language must be null!
    console.log('Cannot proceed, language must be selected');
  }
  else if (window.location.pathname === "/" && selectedLanguage) {
    //TODO: if language is not selected go to language select!
    history.push(`/${selectedLanguage}`);
  } else if (!/^(\/en|\/es)/.test(window.location.pathname)) {
    console.log("URL entered is not a match!");
    history.push("/notfound");
  } else {
    const urlLanguage = window.location.pathname.match(/e[ns]/)[0];
    console.log('Trying to match "en|es" = ', urlLanguage);
    if (urlLanguage !== selectedLanguage)
      console.log("URL requested language change.");
    if (urlLanguage !== selectedLanguage) languageChange(urlLanguage);
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.selectedLanguage = this.props.selectedLanguage;
  }
  componentDidMount() {
    this.props.contactServer();
    console.log("current path = ", window.location.pathname);
    console.log("selectedLanguage = ", this.selectedLanguage);

    //TODO: make sure this works and we don't need to listen for URL changes
    URLCheck(this.selectedLanguage, this.props.languageChange);
  }

  render() {
    if (!this.props.state || !this.props.serverResponse) return "Loading...";
    return (
      <Router history={history}>
        <div>
          <Welcome />
          <Temp
            state={this.props.state}
            serverResponse={this.props.serverResponse}
          />
          <Switch>
            <Route path={`/${this.selectedLanguage}/home`} exact component={Home} />
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
