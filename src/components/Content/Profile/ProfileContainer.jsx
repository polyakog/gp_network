import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import { profileToggleIsFetching, setUserProfile, getUserProfile } from './../../../redux/profile-reducer';
import { Navigate, useParams } from "react-router-dom";
import Preloader from './../../common/Preloader/Preloader';





class ProfileContainer extends React.Component {
    
    componentDidMount (){

        let userId = this.props.params.userId;
        if (!userId) { userId /* = this.props.userId */ = 26059; }
        this.props.getUserProfile(userId)
    
       

    }

    render (){
        
        if (!this.props.isAuth) return <Navigate to='/login' />

            return (
                
                    this.props.isFetching
                        ? <Preloader />
                        : <Profile {...this.props} profile={this.props.profile} />
                
                
        )
    }
    }


let WithUrlDataContainerComponent = (props) => {
    return (<ProfileContainer {...props} params= {useParams()}/>
    )
    }


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userId: state.auth.userId,
    isFetching: state.profilePage.isFetching,
    isAuth: state.auth.isAuth,
});



export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);

