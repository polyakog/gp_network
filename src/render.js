import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { addPost, changePost } from './redux/state';


export let rerender = (state) => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App state={state} addPost={addPost} changePost={changePost}/>
    </BrowserRouter >
  </React.StrictMode>
);
}






