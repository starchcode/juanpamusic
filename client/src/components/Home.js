import React from 'react';
// import history from '../history';

class Home extends React.Component {
componentDidMount() {
    // console.log(this.props.match.path)
    // console.log(/(\/en\/home)$/.test(this.props.match.path))
    // console.log(/^(\/en)/.test(this.props.match.path)) //starts with en?
}

    render(){
        // if (!/(\/en\/|\/es\/)home$/.test(this.props.match.path)){
        //     console.log('Home is pushing to notfound');
        //     history.push('/notfound')
        // } 
        return (
            <div>Home</div>
        )
    }
}

export default Home;