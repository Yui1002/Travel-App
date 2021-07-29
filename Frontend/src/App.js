import React, { Component } from 'react';
import Distance from './components/Distance/Distance'
import Climate from './components/Climate/Climate'

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <Distance />
                {/* <Climate /> */}
            </React.Fragment>
        )
    }
}
 
export default App;