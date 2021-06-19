import React from 'react';
import '../css/app.css';
import '../css/button.css';
import '../css/dropdown.css';
import '../css/exchanger.css';
import { Provider as AlertProvider } from 'react-alert';
import Exchanger from './Exchanger';
import AlertTemplate from './AlertTemplate';

const App = (): JSX.Element => {
    return (
        <AlertProvider template={AlertTemplate} position="bottom right" timeout={5000} transition="scale" type="error">
            <div className="App">
                <Exchanger />
            </div>
        </AlertProvider>
    );
};

export default App;
