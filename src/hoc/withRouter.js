import React from "react";
import { useParams } from 'react-router-dom';


export const WithRouter = (Component) => {
    let RouterIdComponent =(props) => {
        return < Component { ...props } params = { useParams() } />
    }
        
    return RouterIdComponent;
}

