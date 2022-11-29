import React from "react";
import { connect } from 'react-redux';
// import { connect } from 'react-redux/es/exports';
import { Navigate } from 'react-router-dom';


let mapStateToPropsForRedirect = (state) => ( {
        isAuth: state.auth.isAuth,
    });

    

export const withAuthRedirect = (Component) => {
    

    class RedirectComponent extends React.Component {
        render () {
            if (!this.props.isAuth) return <Navigate to='/login' /> 
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}
