import React from "react";
import css from './Profile.module.css';
import MyPosts from './MyPosts';


const Profile = () => {
    
    return (
        <div className={css.profile}>
            {/* Main pic */}
            <div className={css.main_pic_wrapper}>
                <img className={css.main_pic} src="https://media.istockphoto.com/vectors/molecules-or-dna-strand-genetic-engineering-neural-network-innovation-vector-id1200528971?k=20&m=1200528971&s=612x612&w=0&h=vOdPI_Rm5cpnIHssulc2Y89U2O0sN3P26Tb49JUVJiI=" alt="" /></div>
            <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src="https://i.pinimg.com/originals/3e/9c/04/3e9c049cd8ffcbb3f0df3255fc1f47ee.png" alt="" />
                </div>
                <div className={css.description}>
                    <p className={css.user_name}>Gennadij Polyakov</p>
                    <br />
                    <p>Region: Russia</p>
                    <p>Position: Application Engineering</p>
                </div>
            </div>

            <MyPosts />
            
        </div>
    );
}

export default Profile;