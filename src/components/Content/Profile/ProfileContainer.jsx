import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux/es/exports';
import { getUserProfile } from './../../../redux/profile-reducer';
import { useParams } from "react-router-dom";
import Preloader from './../../common/Preloader/Preloader';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';





class ProfileContainer extends React.Component {
    
    componentDidMount (){

        let userId = this.props.params.userId;
        if (!userId) { userId = 26059; }
        this.props.getUserProfile(userId)    
    }

    render (){
        
            return (
                
                    this.props.isFetching
                        ? <Preloader />
                        : <Profile {...this.props} profile={this.props.profile} />                              
        )
    }
    }

    /* HOC */
let AuthRedirectComponent = withAuthRedirect (ProfileContainer)



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    
});

let WithUrlDataContainerComponent = (props) => {return <AuthRedirectComponent {...props} params={useParams()} />}

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);

