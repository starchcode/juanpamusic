import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { languageChange, getAdminData } from "../actions";
import history from "../history";
import "./css/app.css";

import Header from "./Header";
import Language from "./Language";
import LanguageSelect from "./LanguageSelect";
import Welcome from "./Welcome";
import Home from "./Home";
import Music from "./Music";
import Shows from "./Shows";
import NotFound from "./NotFound";
import Footer from "./Footer";



class App extends React.Component {
  constructor(props){
    super(props)
    this.homeRef = React.createRef();
    this.musicRef = React.createRef();
    this.showsRef = React.createRef();
    // this.homeComponent = React.forwardRef((props, ref) => <Home refer={ref}/>)
    this.homeComponent = React.forwardRef((props, ref) => <Home reference={ref}/>)
    this.musicComponent = React.forwardRef((props, ref) => <Music reference={ref} data={this.props.adminData.response} lan={this.props.selectedLanguage}/>)
    this.showsComponent = React.forwardRef((props, ref) => <Shows reference={ref} data={this.props.adminData.response} lan={this.props.selectedLanguage}/>)
  }

  urlLanguageCheck(selectedLanguage, languageChange) {
    const urlPathname = window.location.pathname;
    const browserStorage = window.localStorage.getItem("lan");
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
  loadHandle() {
    console.log('loaded!');
  }
  componentDidMount() {
    this.props.getAdminData(); // get data from backend
    //if language is typed as en or es in URL add it to Redux state on initial render
    this.urlLanguageCheck(
      this.props.selectedLanguage,
      this.props.languageChange
    );
    window.addEventListener('load', this.loadHandle);

  }
  componentDidUpdate() {
    this.languageCheck(this.props.selectedLanguage); //ensuring that on every update ensure URL and selected language are a match.
  }

  render() {
    if (!this.props.adminData) return "Please wait...";
    if (this.props.adminData.error) return this.props.adminData.error
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
          <Header components={[this.homeRef, this.musicRef, this.showsRef]}/>
          <Language />
          <Welcome />
          {/* <Temp
            state={this.props.state}
            serverResponse={this.props.serverResponse}
            adminData={this.props.adminData}
            lan={this.props.selectedLanguage}
          /> */}
          <Switch>
            <Route path="/:lan/home" exact ><this.homeComponent ref={this.homeRef} /></Route>
            {/* <Route path="/:lan/home" exact ><Home ref={this.homeRef} /></Route> */}
            <Route path="/:lan/music" exact ><this.musicComponent ref={this.musicRef} /></Route>
            <Route path="/:lan/shows" exact ><this.showsComponent ref={this.showsRef} /></Route>
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.noReducer,
    contact: state.contact.response,
    selectedLanguage: state.selectedLanguage.lan,
    adminData: state.adminData,
  };
};

export default connect(mapStateToProps, {
  languageChange,
  getAdminData,
})(App);
