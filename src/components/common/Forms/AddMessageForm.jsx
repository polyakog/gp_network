import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator, minLengthCreator } from '../../../utils/validators';
import { Textarea } from '../FormsControls/FormsControls';
import css from './../../Content/Dialogs/Dialogs.module.css'



const maxLength15 = maxLengthCreator(15)
const minLength2 = minLengthCreator(2)

const AddMessageForm = (props) => {
    return (
        <form className={css.onSendMessageClick} onSubmit={props.handleSubmit} >
            <Field
                name='newMessageText'
                type='text'
                label='Add your message'
                component={Textarea}
                rows='4' 
                placeholder='Enter your message' 
                validate={[required, maxLength15, minLength2]}
                />
            
            <button className={css.newMessageButton} >Send message</button>

        </form >
    )
}

export default reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)