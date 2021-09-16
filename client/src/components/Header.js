import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { languageChange } from '../actions';
import history from "../history";

class Header extends React.Component {
languageHandler (lan) {
    this.props.languageChange(lan)
    // history.push(`/${lan}/home`)
}
  render() {

    return (
      <div>
        <Link to={`/${this.props.selectedLanguage}/home`}>Home</Link>
        <button onClick={() => this.languageHandler('en')} >EN</button>
        <button onClick={() => this.languageHandler('es')}>ES</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {selectedLanguage: state.selectedLanguage.lan}
}

export default connect(mapStateToProps, { languageChange })(Header);
