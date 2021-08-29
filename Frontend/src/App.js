import React, { Component } from 'react';
import Distance from './components/Distance/Distance'
import Climate from './components/Climate/Climate'
import Budget from './components/Budget/Budget'
import Activities from './components/Activities/Activities';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <Distance />
                <Climate />
                <Budget />
                <Activities />
            </React.Fragment>
        )
    }
}
 
export default App;