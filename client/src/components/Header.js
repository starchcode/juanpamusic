import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { languageChange } from '../actions';

class Header extends React.Component {

  render() {

    return (
      <div>
        <Link to={`/${this.props.selectedLanguage}/home`}>Home</Link>
        <button onClick={() => this.props.languageChange('en')} >EN</button>
        <button onClick={() => this.props.languageChange('es')}>ES</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {selectedLanguage: state.selectedLanguage.lan}
}

export default connect(mapStateToProps, { languageChange })(Header);
