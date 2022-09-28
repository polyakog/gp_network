import React from "react";
import { connect } from 'react-redux/es/exports';
import * as axios from "axios";
import Header from "./Header";
import { setAuthUserData, setAuthUserPhoto } from './../../redux/auth-reducer';
import { toggleIsFetching } from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import css from './Header.module.css';



class HeaderContainer extends React.Component {
    
    componentDidMount (){
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                
                if (response.data.resultCode===0) {
                let { id, email, login } = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                    this.props.toggleIsFetching(false)
                                        }

                             
                });  

    }

    componentDidUpdate() {
        
            if (this.props.userId != null) {
            let userId = this.props.userId;
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
                .then(response => {
                    this.props.setAuthUserPhoto(response.data.photos.small)
                    
                })
        }
        this.props.toggleIsFetching(false)
    }
 

    render (){
        
        return (<div className={css.header}>
                {this.props.isFetching
                    ? <Preloader/>
                : <Header {...this.props}/>
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

    

export default connect(mapStateToProps, { setAuthUserData, setAuthUserPhoto, toggleIsFetching })(HeaderContainer);

