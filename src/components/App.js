import React from 'react';
import '../css/app.css';
import '../css/button.css';
import '../css/dropdown.css';
import '../css/exchanger.css';
import Exchanger from "./Exchanger";
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: 'bottom right',
    timeout: 5000,
    /*offset: '30px',*/
    transition: 'scale',
    type: 'error',
};

function App() {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <div className="App" >
                <Exchanger/>
            </div>
        </AlertProvider>
    );
}

export default App;
