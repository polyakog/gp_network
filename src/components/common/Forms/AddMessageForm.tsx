import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator, minLengthCreator } from '../../../utils/validators';
import { NewMessageFormType as NewMessageFormValuesType} from '../../Content/Dialogs/Dialogs';
import { createField, Textarea } from '../FormsControls/FormsControls';
import css from './../../Content/Dialogs/Dialogs.module.css'



const maxLength300 = maxLengthCreator(300)
const minLength2 = minLengthCreator(2)

type OwnPropsType = {}

type NewMessageFormValueKeysType = Extract<keyof NewMessageFormValuesType, string>

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, OwnPropsType> & OwnPropsType>
= ({ handleSubmit, error }) => {
    return (
        <form className={css.onSendMessageClick} onSubmit={handleSubmit} >
            {createField<NewMessageFormValueKeysType>(error, 'newMessageText', 'Add your message', Textarea, 'text', 'Enter your message', '', [required, maxLength300, minLength2], '', 4)}
            
            <button className={css.newMessageButton} >Send message</button>

        </form >
    )
}

export default reduxForm<NewMessageFormValuesType, OwnPropsType>({ form: 'dialogAddMessageForm' })(AddMessageForm)