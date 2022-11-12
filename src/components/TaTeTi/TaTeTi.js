import React, { Component } from 'react';
import Nav from '../Nav';
import Game from './Game';

class TaTeTi extends Component {
    state = {  }
    render() { 
        return (
            <>
                {Nav()}
                <Game />
            </> 

         );
    }
}
 
export default TaTeTi;