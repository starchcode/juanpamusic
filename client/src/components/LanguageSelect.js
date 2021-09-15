import React from "react";
import { connect } from "react-redux";
import { languageChange } from "../actions";

class LanguageSelect extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={() => this.props.languageChange('en')}>EN</button>
        <button onClick={() => this.props.languageChange('es')}>ES</button>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedLanguage }) => {
  return {
    selectedLanguage: selectedLanguage.lan,
  };
};

export default connect(mapStateToProps, { languageChange })(LanguageSelect);
