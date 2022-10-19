import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import { getUserProfile } from './../../../redux/profile-reducer';
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
    }

    render (){
        
            return (
                console.log(this.props.params),
                                

                    this.props.isFetching
                        ? <Preloader />
                        : <Profile {...this.props} profile={this.props.profile} />                              
        )
    }
    }

    /* HOC */
// let AuthRedirectComponent = withAuthRedirect (ProfileContainer)



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    
});

export default compose (
    connect(mapStateToProps, { getUserProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);


