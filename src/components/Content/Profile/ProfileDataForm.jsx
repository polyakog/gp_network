import React, { useState } from "react";
import css from './ProfileInfo.module.css';
import cssError from './../../common/FormsControls/FormsControls.module.css'
import jobLooker from '../../../assets/images/jobLooker.webp'
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { required } from "../../../utils/validators";
import sign from "./../../../assets/images/sign4.jpg"

const ProfileData = ({ handleSubmit, index=0, error, profile}) => {
    return <form className={css.description} onSubmit={handleSubmit}>
        <h1>Profile Edit Mode</h1>
        
        <div className={css.buttonSave} ><button >Save</button></div>
        {error &&
            <div className={cssError.formError}>
                <img className={cssError.errorSignPic} src={sign} alt="" />
                <span className={cssError.errorSpan}> {error} </span>
            </div>
        }
        <div className={css.user_name}><b></b> 
        {createField(error, 'fullName', 'Full name:', Input, 'text', 'Fill your Full Name', null, [required], '')}
        </div>
        {createField(error, 'aboutMe', 'About me:', Input, 'text', 'Describe yourself', '', [required], '')}
        
        {/* <p><b>ID:</b> {profile.userId}</p> */}

        <div>
        <div className={css.lookingForAJobText}> <b>Looking for a job:</b>
        {createField(null, 'lookingForAJob', '', 'input', 'checkbox', '', '', [], '')}
        </div>
        {createField(error, 'lookingForAJobDescription', 'My professional skills:', Input, 'text', 'Describe your professional skills ', '', [], '')}
          </div>

        <br />
        <div className={css.contacts}>
            <b>Contacts:</b>
            <ul>
                {Object.keys(profile.contacts).map(keys => {
                    // index = index+1
                    return <li key={keys} >
                        <b>{keys}:</b>  {createField(error, 'contacts.'+keys, '', Input, 'text', `Fill your ${keys} URL`, null, [], '')}
                    </li>
                })}
            </ul>
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false, keepDirtyOnReinitialize: true  }) (ProfileData)

export default ProfileDataReduxForm
