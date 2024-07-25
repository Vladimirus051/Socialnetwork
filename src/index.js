import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import store from "./redux/ReduxStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
    debugger
    root.render(
        <React.StrictMode>
            <App state={state} dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>
    );
}


rerenderEntireTree(store.getState())

store.subscribe(()=>{
    let state = store.getState()
    rerenderEntireTree(state)
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

