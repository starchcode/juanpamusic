import React from 'react';
import history from '../history';

class Home extends React.Component {
componentDidMount() {
    // console.log(this.props.match.path)
    // console.log(/(\/en\/home)$/.test(this.props.match.path))
    // console.log(/^(\/en)/.test(this.props.match.path)) //starts with en?
    // !/^(\/en|\/es)/.test(this.props.match.path)

}

    render(){
        // if (!/(\/en\/|\/es\/)home$/.test(this.props.match.path)){
        //     console.log('Home is pushing to notfound');
        //     history.push('/notfound')
        // } 

        // if(this.props.match.params.lan !== 'en' && this.props.match.params.lan !== 'es'){
        //     console.log('Home: lan is not a match: ', this.props.match.params.lan);
        //     history.push('/notfound')
        // }
        return (
            <div>Home</div>
        )
    }
}

export default Home;