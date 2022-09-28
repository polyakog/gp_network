import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import * as axios from "axios";
import { setUserProfile } from './../../../redux/profile-reducer';
import { useParams } from "react-router-dom";




class ProfileContainer extends React.Component {
    
    componentDidMount (){
        
        let userId = this.props.params.userId;
        if (!userId) { userId = this.props.userId; }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
            this.props.setUserProfile(response.data)
                });
    }

    render (){
            return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
    }


let WithUrlDataContainerComponent = (props) => {
    return (<ProfileContainer {...props} params= {useParams()}/>
    )
    }


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userId: state.auth.userId
});

    

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);

