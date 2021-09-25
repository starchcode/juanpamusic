import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { contactServer, languageChange, getAdminData } from "../actions";
import history from "../history";
import "./css/app.css";

import Header from "./Header";
import Language from "./Language";
import LanguageSelect from "./LanguageSelect";
import Welcome from "./Welcome";
import Home from "./Home";
import NotFound from "./NotFound";

const Temp = (props) => {
  console.log(props.adminData)
  if(!props.adminData.response) return <div>Loading...</div>
  return (
    <div className="overlay">
      <div>Welcome to Juanpa Music</div>
      <div>Language: {props.lan}</div>
      <br />
      <div>{props.state}</div>
      <div>
        {'This is response from backend server "' + props.serverResponse + '"'}
      </div>
      <div>
        {`admin data: ${props.adminData.response.data[0][0]}`}
      </div>
    </div>
  );
};

class App extends React.Component {
  urlLanguageCheck(selectedLanguage, languageChange) {
    const urlPathname = window.location.pathname;
    const browserStorage = window.localStorage.getItem("lan")
    if (urlPathname === "/" && browserStorage) {
      languageChange(browserStorage);
    }

    if (urlPathname.length > 1 && !/^(\/en|\/es)/.test(urlPathname))
      history.push("/notfound");

    if (!urlPathname.match(/e[ns]/)) return;
    const urlLanguage = urlPathname.match(/e[ns]/)[0];

    if (/^(\/en|\/es)/.test(urlPathname) && selectedLanguage !== urlLanguage)
      languageChange(urlLanguage);
  }

  languageCheck(selectedLanguage) {
    const urlPathname = window.location.pathname;
    if (
      selectedLanguage &&
      !urlPathname.match(/^e[ns]$/) &&
      urlPathname.length < 5
    )
      history.push(`/${selectedLanguage}/home`);

    if (
      selectedLanguage &&
      urlPathname.match(/e[ns]/) &&
      urlPathname.match(/e[ns]/)[0] !== selectedLanguage
    ) {
      const regex = new RegExp(urlPathname.match(/e[ns]/)[0]);
      const newHistory = urlPathname.replace(regex, selectedLanguage);
      history.push(newHistory);
    }
  }
  componentDidMount() {
    this.props.getAdminData();
    this.props.contactServer(); // get data from backend
    //if language is typed as en or es in URL add it to Redux state on initial render
    this.urlLanguageCheck(
      this.props.selectedLanguage,
      this.props.languageChange
    );
  }
  componentDidUpdate() {
    this.languageCheck(this.props.selectedLanguage); //ensuring that on every update ensure URL and selected language are a match.
  }

  render() {
    if (!this.props.state || !this.props.serverResponse) return "Loading...";
    // if (window.localStorage.getItem('lan')){
    //   this.props.languageChange(window.localStorage.getItem('lan'))
    // }
    if (
      !this.props.selectedLanguage &&
      window.location.pathname !== "/notfound"
    )
      return <LanguageSelect />;
    return (
      <Router history={history}>
        <div className="main">
          <Header />
          <Language />
          <Welcome />
          {/* <Temp
            state={this.props.state}
            serverResponse={this.props.serverResponse}
            adminData={this.props.adminData}
            lan={this.props.selectedLanguage}
          /> */}
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
    adminData: state.adminData
  };
};

export default connect(mapStateToProps, { contactServer, languageChange, getAdminData })(App);
