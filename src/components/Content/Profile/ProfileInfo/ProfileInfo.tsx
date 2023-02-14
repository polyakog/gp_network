import React, { ChangeEvent, FC, useState } from "react";
import Preloader from "../../../common/Preloader/Preloader";
import css from './ProfileInfo.module.css';
import jobLooker from '../../../../assets/images/jobLooker.webp'
import noPic from '../../../../assets/images/noPic.jpg'
import ProfileStatusWithHook from './ProfileStatusWithHook';
import ProfileDataReduxForm, { ProfileDataFormValueType } from "./ProfileDataForm";
import {ContactsType, ProfileType } from "../../../../types/types";


export type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    isOwner: boolean
    saveProfile: (profile: ProfileDataFormValueType) => Promise<boolean>
}

const ProfileInfo: FC<PropsType> = ({ profile, status, updateUserStatus, savePhoto, isOwner, saveProfile }) => {

    let [photoEditability, setPhotoEditability] = useState(false);
    let [fileName, setFileName] = useState<string>()
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
            setFileName(e.target.files[0].name)
            console.log("uploading photo: ", fileName)
        }
    }

    const onSubmit = (formData: ProfileDataFormValueType) => {
        // todo: remove then
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div >
            <div className={css.avatar_description}>
                <div className={css.avatar}>
                    <img src={!profile.photos.large ? noPic : profile.photos.large} onDoubleClick={() => { setPhotoEditability(true) }} className={css.avatarPhoto} alt="avatar" />

                    {isOwner && photoEditability &&
                        (<div>
                            <span className={css.inputFileText} /* type="text" */ >{fileName ? "Uploaded file: " + fileName : "Upload your photo"}</span>
                            <label className={css.inputFile}>
                                <input type='file' onChange={onMainPhotoSelected} name="file" />
                                <span className={css.inputFileBtn}> Choose your file</span>
                            </label>
                        </div>
                        )}

                    <div>
                        <b>My status:</b>
                        <ProfileStatusWithHook status={status} updateUserStatus={updateUserStatus} />
                    </div>
                </div>

                {editMode

                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}
            </div>
        </div>

    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
    index?: number
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode, index = 0 }) => {
    return <div className={css.description}>
        <h1>Profile</h1>
        <br />
        {isOwner && <div><button onClick={goToEditMode}>Edit profile</button></div>}
        <p className={css.user_name}><b>Full name:</b> {profile.fullName}</p>

        <p><b>About me:</b>  {profile.aboutMe}</p>
        <p><b>ID:</b> {profile.userId}</p>

        <div>
            <img src={jobLooker} alt="looking for a job"
                className={profile.lookingForAJob ? css.lookingForAJob : css.lookingForAJob + " " + css.false}
            />
            <p className={css.lookingForAJobText}> <b>Looking for a job:</b>{profile.lookingForAJob ? " Yes" : " No"}</p>
            {profile.lookingForAJob && <p><b>My professional skills:</b>  {profile.lookingForAJobDescription}</p>}
        </div>

        <br />
        <div className={css.contacts}>
            <b>Contacts:</b>

            <ul> {Object
                .keys(profile.contacts)
                .map(keys => {
                    // debugger
                    // index = index + 1
                    return <Contact keys={keys} contactTitle={keys} contactValue={profile.contacts[keys as keyof ContactsType] } />
                })}
            </ul>
        </div>
    </div>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string|null
    keys:string
    }
const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div>
        {contactValue &&
            (<li><b>{contactTitle}:</b> {contactValue}</li>)
        }
    </div>
}

export default ProfileInfo;
