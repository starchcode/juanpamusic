import React from 'react';
import { connect } from 'react-redux';
import { contactServer } from '../actions';

class App extends React.Component {
    componentDidMount() {
        this.props.contactServer();
    }
    
    render() {
        console.log(this.props)
        if (!this.props.state || !this.props.serverResponse) return 'Loading...'
        return(
            <div>
                <div>Welcome to Juanpa Music</div>
                <br />
                <div>{this.props.state }</div>
                <div>{'This is response from backend server "' + this.props.serverResponse + '"' }</div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state.noReducer,
        serverResponse: state.serverResponse.response
    }
}


export default connect(mapStateToProps, { contactServer })(App);

