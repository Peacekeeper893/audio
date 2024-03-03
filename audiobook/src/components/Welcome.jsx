import React from 'react';
import Navbar from './Navbar';
import Body from './WelcomePages/Body';


const Welcome = ({loggedIn}) => {
    return (
        <div>
            <Navbar {...{ loggedIn }} />
            <Body />



            
        </div>

    );
};

export default Welcome;
