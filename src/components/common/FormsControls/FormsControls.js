import React from "react";
import css from "./FormsControls.module.css";
import sign from "../../../assets/images/sign4.jpg"
import { Field } from "redux-form";


const FormControl = ({ input, meta: { touched, error }, label, children, ...props }) => {
    // debugger
    const hasError = touched && error;
    return (
        <div >
            <label className={css.label}>{label}</label>

            <div className={(hasError ? css.errorTextarea : " ")}>
                {children}
            </div>

            {touched && error && 
            <div className={css.warningWrap}>
                <img className={css.signPic} src={sign} alt="" />
                <span className={css.errorSpan}>{error}</span>
            </div>
            }


        </div>
    )
}

export const Textarea = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><textarea className={css.Textarea} {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {

    const { input, ...restProps } = props;
    return <FormControl {...props}><input className={css.Textarea} {...input} {...restProps} /></FormControl>
}



export const createField = (error, name, label, component, type, placeholder, autocomplete, validate, text) => (
        <div className={error ? css.errorField : ''}>
            <Field
                name = {name}
                label={label}
                component={component}
                type={type}
                placeholder={placeholder}
                autocomplete={autocomplete}
                validate={validate}
            /> {text}
        </div>



    )
