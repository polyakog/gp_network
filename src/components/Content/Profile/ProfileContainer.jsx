import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux';
// import { connect } from 'react-redux/es/exports';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../../redux/profile-reducer.ts';
import Preloader from './../../common/Preloader/Preloader';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from "redux";
import { withRouter } from "../../../hoc/withRouter";
import { withNavigate } from '../../../hoc/withNavigate';






class ProfileContainer extends React.Component {
    
    refreshProfile () {
    let userId = this.props.params.userId;
if (!userId) { userId = this.props.userId; }
if (!userId) {
    this.props.navigate('/login'); /* не обязательно, можно удалить. Для инфы */
}
this.props.getUserProfile(userId)
this.props.getUserStatus(userId)    
}


    componentDidMount (){
    this.refreshProfile()
    }

    componentDidUpdate(prevPops, prevState, snapshot) {
    if (this.props.params.userId !== prevPops.params.userId) {
          this.refreshProfile();  
        }
        
    }

    render (){
        return (
                 this.props.isFetching
                    ? <Preloader message='profile loading' />
                        : <Profile 
                            {...this.props} 
                            profile={this.props.profile} 
                            status={this.props.status}
                            updateUserStatus = {this.props.updateUserStatus}
                            savePhoto = {this.props.savePhoto}
                            saveProfile = {this.props.saveProfile}
                            isOwner={!this.props.params.userId}
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
    userId: state.auth.userId,
    
    
});



 
export default compose (
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter,
    withNavigate,
    withAuthRedirect,
)(ProfileContainer);


