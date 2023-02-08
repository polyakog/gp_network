import React from "react";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapPropsType = { isAuth: boolean }


export function withAuthRedirect<Props extends MapPropsType>(Component: React.ComponentType<Props>) {

    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate to='/login' />
        return <Component {...restProps as Props} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}
