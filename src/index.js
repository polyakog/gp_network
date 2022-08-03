import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

/* Базы данных */

var postData = [
  { id: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
  { id: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
  { id: 3, message: 'finally. It is a new good network', likeCount: 51, Name: 'Peter' },
  { id: 4, message: "I'm agree", likeCount: 41, Name: 'Martin' },
  { id: 5, message: 'We can share info here', likeCount: 44, Name: 'Alexey' },
  { id: 6, message: 'I will upload all data', likeCount: 53, Name: 'Gennadij' }
 
]

var dialogData = [
  { id: 1, name: "Gennadij" },
  { id: 2, name: "Alexey" },
  { id: 3, name: "Sergey" },
  { id: 4, name: "Anton" },
  { id: 5, name: "Dhaval" },
  { id: 6, name: "David" }
]

var messageData = [
  { id: 3, name: "Sergey", text: "Hi, I have a request from the customer" },
  { id: 1, name: "Gennadij", text: "happy to hear" },
  { id: 3, name: "Sergey", text: "What is your plans?" },
  { id: 1, name: "Gennadij", text: "preparation" }
]



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App postData={postData} dialogData={dialogData} messageData={messageData}/>
    </BrowserRouter >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



