import React from "react";
import { connect } from "react-redux";
import { languageChange } from "../actions";
import { languageData } from "./languageFile/languageFile";

class Notfound extends React.Component {

componentDidMount() {
  // history.push('/' + this.props.selectedLanguage + '/notfound')
}

  render() {
    const notFoundURL = window.location.href
    // console.log('not fount render')
    // if(!this.props.selectedLanguage) return <div id="notfound" className="beforeEntry page">Please wait</div>
    return (
      <div id="notfound" className="beforeEntry message page" ref={this.props.reference}>
        <div>
          <h1>{languageData[this.props.selectedLanguage].notfound[0]}</h1>
          <p>{notFoundURL}</p>
          <br />
          <h2>{languageData[this.props.selectedLanguage].notfound[1]}</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedLanguage: state.selectedLanguage.lan,
  };
};

export default connect(mapStateToProps, { languageChange })(Notfound);
