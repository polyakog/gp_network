import React from "react";
import css from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from './MyPostsContainer';

let srcLink = 'https://i.pinimg.com/originals/74/e2/1b/74e21bec1bf0b8b2272cf1ee3e11677c.png'


const Profile = (props) => {

    return (
        <div className={css.profile} >
            {/* Main pic */}
            <div className={css.main_pic_wrapper}>
                <img className={css.main_pic} src={srcLink} alt="" /></div>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} savePhoto={props.savePhoto} isOwner={props.isOwner}/> {/* Avatar + discription */}
            <MyPostsContainer />
          

        </div>
    );
}

export default Profile;

