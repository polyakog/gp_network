import React from "react";
// import { connect } from 'react-redux/es/exports';
import { connect } from 'react-redux';
import Header from "./Header";
import { logout } from './../../redux/auth-reducer';
import css from './Header.module.css';




class HeaderContainer extends React.Component {

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



let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    userPhoto: state.auth.userPhoto

});


export default connect(mapStateToProps, { logout })(HeaderContainer);

