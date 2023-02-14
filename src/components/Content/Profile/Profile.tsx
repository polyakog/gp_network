import React from "react";
import css from './Profile.module.css';
import ProfileInfo, { PropsType } from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from './MyPost/MyPostsContainer';
import background from '../../../assets/images/background.png'


const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={css.profile} >
            {/* Main pic */}
            <div className={css.main_pic_wrapper}>
                <img className={css.main_pic} src={background} alt="" /></div>
                
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} savePhoto={props.savePhoto} isOwner={props.isOwner} saveProfile={props.saveProfile} /> {/* Avatar + discription */}
            <MyPostsContainer />
        </div>
    );
}

export default Profile;

