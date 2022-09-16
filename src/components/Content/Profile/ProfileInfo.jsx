import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import css from './ProfileInfo.module.css';



const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div >
            {/* Main pic */}
                        <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src={props.profile.photos.large} alt="" />
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