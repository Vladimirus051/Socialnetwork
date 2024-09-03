import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import React from "react";
import MainSApp from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = () => {
    root.render(
        <MainSApp/>
    );
}

rerenderEntireTree()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

