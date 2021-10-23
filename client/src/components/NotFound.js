import React from "react";
import { connect } from "react-redux";
import { languageChange } from "../actions";

class Notfound extends React.Component {
  componentDidMount() {
    console.log('NOT FOUND MOUNTED');
    if (!this.props.selectedLanguage && !window.localStorage.getItem("lan")) {
      this.props.languageChange("en");
    } else if (!this.props.selectedLanguage) {
      this.props.languageChange(window.localStorage.getItem("lan"));
    }
  }

  render() {
    return (
      // <div ref={this.props.reference}>
      <div ref={this.props.reference}>
        <div style={{ color: "red" }}>Not Found</div>
        <div>{this.props.selectedLanguage}</div>
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
