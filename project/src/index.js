
//import {AppContainer} from 'react-hot-loader';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from 'redux-persist/lib/integration/react';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firevase, { FirebaseContext } from './components/Firebase';
import Firebase from "./components/Firebase";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </PersistGate>
    </Provider>,
   document.getElementById("root"), 
);


// if(module.hot){
//     module.hot.accept('./App', () => {
//         const NextApp = require ('./App').default;
//         ReactDOM.render(
//             // <AppContainer>
//             <NextApp/>,
//             // </AppContainer>,
//              document.getElementById("root"), 
//         );
//     });
// }
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
