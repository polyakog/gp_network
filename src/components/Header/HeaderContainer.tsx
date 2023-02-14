import React from "react";
// import { connect } from 'react-redux/es/exports';
import { connect } from 'react-redux';
import Header from "./Header";
import { logout} from './../../redux/auth-reducer';
import css from './Header.module.css';
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    // componentDidMount() {

    //     this.props.getAuthUserData()


    // }
    render() {

        return (<div className={css.header}>
            <Header {...this.props} />
        </div>
        )
    }
}

export type MapPropsType = {
    login: string|null
    isAuth: boolean
    userId: number|null
    userPhoto: string|null
}

export type DispatchPropsType = {
    logout: () => void
}

let mapStateToProps = (state: AppStateType): MapPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    userPhoto: state.auth.userPhoto
});

export default connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, { logout })(HeaderContainer);

