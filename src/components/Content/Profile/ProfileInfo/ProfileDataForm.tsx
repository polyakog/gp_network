import css from './ProfileInfo.module.css';
import cssError from './../../../common/FormsControls/FormsControls.module.css'
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input} from "../../../common/FormsControls/FormsControls";
import { required } from "../../../../utils/validators";
import sign from "./../../../../assets/images/sign4.jpg"
import { ContactsType, ProfileType } from '../../../../types/types';

export type ProfileDataFormValueType= ProfileType

type ProfileDataFormOwnPropsType = {
    profile: ProfileType
}

type ProfileFormValueTypeKeys = GetStringKeys<ProfileDataFormValueType> 
type ProfileFormContactsValueTypeKeys = GetStringKeys<ContactsType> 


const ProfileDataForm:React.FC<InjectedFormProps<ProfileDataFormValueType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType > = ({ handleSubmit, error, profile}) => {
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
            {createField<ProfileFormValueTypeKeys>(error, 'fullName', 'Full name:', Input, 'text', 'Fill your Full Name', '', [required], '', null)}
        </div>
        {createField<ProfileFormValueTypeKeys>(error, 'aboutMe', 'About me:', Input, 'text', 'Describe yourself', '', [required], '', null)}
        
        {/* <p><b>ID:</b> {profile.userId}</p> */}

        <div>
        <div className={css.lookingForAJobText}> <b>Looking for a job:</b>
                {createField<ProfileFormValueTypeKeys>(null, 'lookingForAJob', '', 'input', 'checkbox', '', '', [], '', null)}
        </div>
            {createField<ProfileFormValueTypeKeys>(error, 'lookingForAJobDescription', 'My professional skills:', Input, 'text', 'Describe your professional skills ', '', [], '', null)}
          </div>

        <br />
        <div className={css.contacts}>
            <b>Contacts:</b>
            <ul>
                {Object.keys(profile.contacts).map(keys => {
                    // index = index+1
                    return <li key={keys} >
                        <b>{keys}:</b>  {createField<ProfileFormContactsValueTypeKeys>(error, 'contacts.' + keys as ProfileFormContactsValueTypeKeys, '', Input, 'text', `Fill your ${keys} URL`, '', [], '', null)}
                    </li>
                })}
            </ul>
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileDataFormValueType, ProfileDataFormOwnPropsType>({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false, keepDirtyOnReinitialize: true  }) (ProfileDataForm)

export default ProfileDataReduxForm
