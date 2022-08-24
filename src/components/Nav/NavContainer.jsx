import React from "react";
import StoreContext from "../../StoreContext";
import Nav from "./Nav";




const NavContainer = (props) => {

    return <StoreContext.Consumer>
        { store => {

    let state = store.getState();
        
    return <Nav friendsData={state.sidebar.friendsData} /> 


        }
        }
    </StoreContext.Consumer>

}



export default NavContainer;