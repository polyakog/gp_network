import React from "react";
import { connect } from 'react-redux/es/exports';
import * as axios from "axios";
import Header from "./Header";
import { setAuthUserData, setAuthUserPhoto, authToggleIsFetching } from './../../redux/auth-reducer';
import Preloader from "../common/Preloader/Preloader";
import css from './Header.module.css';
import { usersAPI } from "../../api/api";



class HeaderContainer extends React.Component {

    componentDidMount() {

        this.props.authToggleIsFetching(true)
        usersAPI.authUsers()
            .then(data => {

                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    this.props.setAuthUserData(id, email, login);

                    let userId = this.props.userId;
                    usersAPI.userData(userId)
                        .then(data => {
                            this.props.setAuthUserPhoto(data.photos.small)

                        })

                    this.props.authToggleIsFetching(false)
                }
            });

    }


    render() {

        return (<div className={css.header}>
            {this.props.isFetching
                ? <Preloader />
                : <Header {...this.props} />
            }
        </div>

        )
    }
}



let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
    userId: state.auth.userId,
    userPhoto: state.auth.userPhoto

});



export default connect(mapStateToProps, { setAuthUserData, setAuthUserPhoto, authToggleIsFetching })(HeaderContainer);

