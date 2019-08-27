import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/app";
import Counter from "./components/counter";

import * as auth from "./utilities/authHelperFunctions" 

import reducer from "./reducers";

import { createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
    withRouter
  } from 'react-router-dom';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const action = (type:any) => store.dispatch({type});

console.log('NEW Ver');

const cookie = window.document.cookie;
console.log("index:cookie: ///////////", cookie);

console.log("Store", store.getState());

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App cookie={cookie} isAuthenticated={false}/> 
        </Provider>
    </Router>
,
    document.getElementById("example")
);

// auth.knockknock(cookie).then(
//     (params:any)=>{
//     console.log("KK: resolved\n", params);
//     ReactDOM.render(
//         <Provider store={store}>
//             <App cookie={cookie} isAuthenticated={true}/> 
//         </Provider>,
//         document.getElementById("example"),
//         ()=>{
//             console.log("YES COOKIES ////////////////////////////////////////////////////////////", this);     
//         }
//     );
// },
// (params:any)=>{
//     console.log("KK: rejected\n", params);
//     ReactDOM.render(
//         <Provider store={store}>
//             <App cookie={cookie} isAuthenticated={false}/> 
//         </Provider>,
//         document.getElementById("example"),
//         ()=>{
//             console.log("NO COOKIES ////////////////////////////////////////////////////////////", this);     
//         }
//     );
// })

// (()=>action('INCREMENT'))();

// function createCounter() {
//     ReactDOM.render(
//       <Counter
//         value={store.getState()}
//         onIncrement={() => action('INCREMENT')}
//         onDecrement={() => action('DECREMENT')} />,
//       document.getElementById('example')
//     )
//   }
  
//   createCounter()
//store.subscribe(createCounter)
  