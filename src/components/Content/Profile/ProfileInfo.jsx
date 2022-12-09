import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import css from './ProfileInfo.module.css';
import jobLooker from '../../../assets/images/jobLooker.webp'
import noPic from '../../../assets/images/noPic.jpg'
import ProfileStatusWithHook from './ProfileStatusWithHook';



const ProfileInfo = ({ profile, status, updateUserStatus, savePhoto, isOwner }) => {

    let [photoEditability, setPhotoEditability] = useState(false);
    let [fileName, setFileName] = useState()


    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) { savePhoto(e.target.files[0]) }
        setFileName(e.target.files[0].name)
        console.log("uploading photo: ", fileName)
    }
    

    return (
        <div >

            <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src={!profile.photos.large ? noPic : profile.photos.large}
                        onDoubleClick={() => { setPhotoEditability(true) }}
                        alt="avatar"
                        className={css.avatarPhoto}
                    />

                    {isOwner && photoEditability &&
                        (<div>
                            <span className={css.inputFileText} type="text">{fileName ? "Uploaded file: " + fileName : "Upload your photo"}</span>
                            <label className={css.inputFile}>
                                <input type='file' onChange={onMainPhotoSelected} name="file" />
                                <span className={css.inputFileBtn}> Choose your file</span>
                            </label>
                            </div>
                        )}

                    <div>
                        My status:
                        <ProfileStatusWithHook status={status} updateUserStatus={updateUserStatus} />
                    </div>
                </div>

                <div className={css.description}>
                    <p className={css.user_name}>{profile.fullName}</p>
                    <p>About me: {profile.aboutMe}</p>

                    <p>ID: {profile.userId}</p>

                    <img src={jobLooker} alt="looking for a job" className={profile.lookingForAJob
                        ? css.lookingForAJob
                        : css.lookingForAJob + " " + css.false} />

                    <p> {profile.lookingForAJob
                        ? ("Looking for a job: " + profile.lookingForAJobDescription)
                        : null}
                    </p>
                    <br />
                    <div className={css.contacts}>Contacts:
                        <ul>
                            {profile.contacts.facebook !== null ? <li> {"Facebook: " + profile.contacts.facebook}   </li> : null}
                            {profile.contacts.website !== null ? <li> {"Website: " + profile.contacts.website}      </li> : null}
                            {profile.contacts.vk !== null ? <li>{"VK: " + profile.contacts.vk}                </li> : null}
                            {profile.contacts.github !== null ? <li>{"Github: " + profile.contacts.github}        </li> : null}
                            {profile.contacts.youtube !== null ? <li>{"youtube: " + profile.contacts.youtube}        </li> : null}
                            {profile.contacts.twitter !== null ? <li>{"twitter: " + profile.contacts.twitter}        </li> : null}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;