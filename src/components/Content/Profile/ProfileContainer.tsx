import React from "react";
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from "redux";
import { withRouter } from "../../../hoc/withRouter";
import { withNavigate } from '../../../hoc/withNavigate';
import { ProfileType } from "../../../types/types";
import { AppStateType } from "../../../redux/redux-store";

type MapStateToPropsType = {
    profile: ProfileType | null
    isFetching: boolean
    status: string
    userId: number | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: () => void
    savePhoto: () => void
    saveProfile: (formData: any) => Promise<boolean>
    navigate: (link: string) => void
}

type OwnPropsType = {
    params: { userId: number }
    isOwner: boolean
}

export type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        let userId = this.props.params.userId;
        //@ts-ignore
        if (!userId) { userId = this.props.userId; }
        if (!userId) {
            this.props.navigate('/login'); /* не обязательно, можно удалить. Для инфы */
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevPops: ProfilePropsType, prevState: AppStateType, snapshot: any) {
        if (this.props.params.userId !== prevPops.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            this.props.isFetching
                ? <Preloader message='profile loading' />
                : <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateUserStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                    isOwner={!this.props.params.userId}
                />
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    userId: state.auth.userId
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter,
    withNavigate,
    withAuthRedirect,
)(ProfileContainer)
