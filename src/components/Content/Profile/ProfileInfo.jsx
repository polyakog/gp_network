import React from "react";
import css from './ProfileInfo.module.css';



const ProfileInfo = (props) => {

    return (
        <div >
            {/* Main pic */}
            <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src="https://i.pinimg.com/originals/3e/9c/04/3e9c049cd8ffcbb3f0df3255fc1f47ee.png" alt="" />
                </div>

                <div className={css.description}>
                    <p className={css.user_name}>Gennadij Polyakov</p>
                    <br />
                    <p>Region: Russia</p>
                    <p>Unit: ACM</p>
                    <p>Position: Application Engineering</p>
                </div>
            </div>

            

        </div>
    );
}

export default ProfileInfo;