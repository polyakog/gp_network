import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import { getUserProfile, getUserStatus, updateUserStatus } from './../../../redux/profile-reducer';
// import { useParams } from "react-router-dom";
import Preloader from './../../common/Preloader/Preloader';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from "redux";
import { withRouter } from "../../../hoc/withRouter";





class ProfileContainer extends React.Component {
    
    componentDidMount (){

        let userId = this.props.params.userId;
        if (!userId) { userId = 26059; }
       
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)    

    }

    render (){
        
            return (
                                            

                    this.props.isFetching
                        ? <Preloader />
                        : <Profile 
                            {...this.props} 
                            profile={this.props.profile} 
                            status={this.props.status}
                            updateUserStatus = {this.props.updateUserStatus}
                             />                              
        )
    }
    }

    /* HOC */
// let AuthRedirectComponent = withAuthRedirect (ProfileContainer)



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    
});


export default compose (
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);


