import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import * as axios from "axios";
import { profileToggleIsFetching, setUserProfile } from './../../../redux/profile-reducer';
import { useParams } from "react-router-dom";
import Preloader from './../../common/Preloader/Preloader';




class ProfileContainer extends React.Component {
    
    componentDidMount (){
        this.props.profileToggleIsFetching(true)
        let userId = this.props.params.userId;
        
        if (!userId) { userId = this.props.userId; }
        if (this.props.userId !==null) { 
          
            usersAPI.userData(userId)
                .then(data => {
                    this.props.setUserProfile(data)
                    this.props.profileToggleIsFetching(false)
                });

       }
       

    }

    render (){
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
});



export default connect(mapStateToProps, { setUserProfile, profileToggleIsFetching })(WithUrlDataContainerComponent);

