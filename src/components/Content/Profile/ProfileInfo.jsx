import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import css from './ProfileInfo.module.css';
import jobLooker from '../../../assets/images/jobLooker.webp'
import noPic from '../../../assets/images/noPic.jpg'
import ProfileStatus from './ProfileStatus';
import { getAuthUserData } from './../../../redux/auth-reducer';
import ProfileStatusWithHook from './ProfileStatusWithHook';




const ProfileInfo = (props) => {


        if (!props.profile) {
        return <Preloader />
    }


    return (
        <div >
            
            <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src={!props.profile.photos.large ? noPic : props.profile.photos.large} alt="avatar" />
                <div> 
                    My status:
                        <ProfileStatusWithHook status={props.status} updateUserStatus={props.updateUserStatus} />
                </div>
                
                </div>

                
                

                <div className={css.description}>
                    <p className={css.user_name}>{props.profile.fullName}</p>
                    <p>About me: {props.profile.aboutMe}</p>

                    <p>ID: {props.profile.userId}</p>
                    
                        <img src={jobLooker} alt="looking for a job" className={props.profile.lookingForAJob
                             ? css.lookingForAJob
                        : css.lookingForAJob + " "+ css.false } />
                        
                        

                    <p> {props.profile.lookingForAJob
                        ? ("Looking for a job: " + props.profile.lookingForAJobDescription)
                        : null} 
                    </p>
                    <br />
                    <div className={css.contacts}>Contacts:
                    <ul>


                        {props.profile.contacts.facebook !== null ? <li> {"Facebook: " + props.profile.contacts.facebook }   </li> : null}
                        {props.profile.contacts.website !== null ? <li> {"Website: " + props.profile.contacts.website}      </li> : null}
                        {props.profile.contacts.vk !== null ? <li>{"VK: " + props.profile.contacts.vk}                </li> : null}
                        {props.profile.contacts.github !== null ? <li>{"Github: " + props.profile.contacts.github}        </li> : null}
                        {props.profile.contacts.youtube !== null ? <li>{"youtube: " + props.profile.contacts.youtube}        </li> : null}
                        {props.profile.contacts.twitter !== null ? <li>{"twitter: " + props.profile.contacts.twitter}        </li> : null}
                    </ul>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default ProfileInfo;