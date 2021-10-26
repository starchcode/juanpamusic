import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

import { languageChange, getAdminData } from "../actions";
import "./css/app.css";

import Loading from "./Loading";
import Error from "./Error";
import Header from "./Header";
import Language from "./Language";
import LanguageSelect from "./LanguageSelect";
import Home from "./Home";
import Music from "./Music";
import Shows from "./Shows";
import NotFound from "./NotFound";
import Footer from "./Footer";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { isLoaded: false }
    this.languages = ['en', 'es']
    this.homeRef = React.createRef();
    this.musicRef = React.createRef();
    this.showsRef = React.createRef();
    this.notFoundRef = React.createRef();
    this.loaded = false;
    this.homeComponent = React.forwardRef((props, ref) => <Home reference={ref} components={[this.homeRef, this.musicRef, this.showsRef, this.notFoundRef]}/>)
    this.musicComponent = React.forwardRef((props, ref) => <Music reference={ref} />)
    this.showsComponent = React.forwardRef((props, ref) => <Shows reference={ref} />)
    this.NotFoundComponent = React.forwardRef((props, ref) => <NotFound reference={ref} />)

  }

  pathsToMatch = (path) => {    
    return this.languages.map(lan => {
        return '/' + lan + '/' + path
    })
  }

  urlLanguageCheck(selectedLanguage, languageChange) {
    // console.log("URL language after first mount called", selectedLanguage);
    const urlPathname = window.location.pathname;
    const browserStorage = window.localStorage.getItem("lan");
    const doesItInclude = urlPathname.match(/e[ns]/);
    const doesItStartWith = urlPathname.match(/^\/e[ns]/);

    const isItOnlyLanguage = urlPathname.match(/^\/e[ns]\/?$/);
    // console.log("isItOnlyLanguage ",isItOnlyLanguage)

    if (urlPathname === "/" && browserStorage) {
      languageChange(browserStorage);
      history.push(`/${browserStorage}/home`);
      return;
    }else if(urlPathname === "/" && !browserStorage){
      return; //So it will go to languageSelect page
    }

    if (!doesItStartWith) {
    // if (!doesItInclude && browserStorage) {
      languageChange(browserStorage || 'en');
      // history.push(`/${browserStorage || 'en'}/notfound`);
    }else if(isItOnlyLanguage){
      const urlLanguage = doesItInclude[0];
      languageChange(urlLanguage);
      history.push(`/${urlLanguage}/home`);
    }

  }

  languageCheck(selectedLanguage) {
    const urlPathname = window.location.pathname;
    const doesItInclude = urlPathname.match(/e[ns]/);
    
    // console.log('languageCheck called', selectedLanguage, urlPathname);

    if (selectedLanguage && urlPathname === '/') {
      // console.log("languageCheck 1st condition");
      history.push(`/${selectedLanguage}/home`);
    }
    if (
      selectedLanguage &&
      doesItInclude &&
      doesItInclude[0] !== selectedLanguage
    ) {
      // console.log('languageCheck 2nd condition')
      const regex = new RegExp(doesItInclude[0]);
      const newHistory = urlPathname.replace(regex, selectedLanguage);
      history.push(newHistory);
    }
    if(!selectedLanguage && doesItInclude && doesItInclude[0]){
      //if popstate make sure to make the update the selectedLanguage with URL
      this.props.languageChange(doesItInclude[0])
    }
  }

  loadHandle = () => {
    console.log('isLoaded? ', this.state.isLoaded);
    this.setState({isLoaded: true})
    console.log('isLoaded? ', this.state.isLoaded);

    console.log(document.cookie.split(';'))
  }
  componentDidMount() {
    this.props.getAdminData(); // get data from backend
    //if language is typed as en or es in URL add it to Redux state on initial render
    this.urlLanguageCheck(
      this.props.selectedLanguage,
      this.props.languageChange
    );
    window.addEventListener('load', this.loadHandle);
    // this.homeRef.current.addEventListener('load', this.loadHandle);
    window.addEventListener('popstate',()=> this.languageCheck());
  }
  componentDidUpdate() {
    this.languageCheck(this.props.selectedLanguage); //ensuring that on every update ensure URL and selected language are a match.
  }

  render() {
    // return<div><NotFound /></div>
    if (this.props.adminData.error) return <Error message={this.props.adminData.error}/>
    if (!this.state.isLoaded || !this.props.adminData.response) return <Loading />;
    if (!this.props.selectedLanguage){
      return <LanguageSelect />;
    }
    return (
      <Router history={history}> 
      <div className="main">
          <Header components={[this.homeRef, this.musicRef, this.showsRef, this.notFoundRef]}/>
          <Language />
          <Switch>
            <Route path={this.pathsToMatch('home')} exact ><this.homeComponent ref={this.homeRef} /></Route>
            <Route path={this.pathsToMatch('music')} exact ><this.musicComponent ref={this.musicRef} /></Route>
            <Route path={this.pathsToMatch('shows')} exact ><this.showsComponent ref={this.showsRef} /></Route>
            <Route ><this.NotFoundComponent ref={this.notFoundRef} /></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedLanguage: state.selectedLanguage.lan,
    adminData: state.adminData,
  };
};

export default connect(mapStateToProps, {
  languageChange,
  getAdminData,
})(App);