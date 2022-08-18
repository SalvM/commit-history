import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyCgszmEgSrFvWvlr69CSk4kXMO6lREzSjc",
  authDomain: "commit-history-test.firebaseapp.com",
  projectId: "commit-history-test",
  storageBucket: "commit-history-test.appspot.com",
  messagingSenderId: "878217647024",
  appId: "1:878217647024:web:dc14841fb2991794747c75"
};
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
