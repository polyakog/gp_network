import React from "react";
import css from "./FormsControls.module.css";
import sign from "../../../assets/images/sign4.jpg"
import { Field } from "redux-form";


const FormControl = ({ input, meta: { touched, error }, label, children, ...props }) => {
    // debugger
    const hasError = touched && error;
    return (
        <div className={hasError ? css.errorField : ''}>
            <label className={css.label}>{label}</label>
            <div className={(hasError ? (css.Text+' '+ css.errorText) : css.Text)}>
                {children}
            </div>

            {hasError && 
            <div className={css.warningWrap}>
                <img className={css.errorSignPic} src={sign} alt="" />
                <span className={css.errorSpan}>{error}</span>
            </div>
            }

        </div>
    )
}

export const Textarea = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {

    const { input, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


/* Form Patern */

export const createField = (error, name, label, component, type, placeholder, autocomplete, validate, text) => (
        <div>
            <Field
                name = {name}
                label={label}
                component={component}
                type={type}
                placeholder={placeholder}
                autoComplete={autocomplete}
                validate={validate}
            /> {text}
        </div>



    )
