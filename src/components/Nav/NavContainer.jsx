import React from "react";
import Nav from "./Nav";



const NavContainer = (props) => {

    let state = props.store.getState();
        
    return (<Nav friendsData={state.sidebar.friendsData} /> )
}

export default NavContainer;