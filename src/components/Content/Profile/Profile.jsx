import React from "react";
import css from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from './MyPostsContainer';




const Profile = (props) => {

    return (
        <div className={css.profile} >
            {/* Main pic */}
            <div className={css.main_pic_wrapper}>
                <img className={css.main_pic} src="https://media.istockphoto.com/vectors/molecules-or-dna-strand-genetic-engineering-neural-network-innovation-vector-id1200528971?k=20&m=1200528971&s=612x612&w=0&h=vOdPI_Rm5cpnIHssulc2Y89U2O0sN3P26Tb49JUVJiI=" alt="" /></div>
            <ProfileInfo/> {/* Avatar + discription */}
            <MyPostsContainer />
          

        </div>
    );
}

export default Profile;

