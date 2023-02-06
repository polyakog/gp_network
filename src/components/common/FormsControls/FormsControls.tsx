import React from "react";
import css from "./FormsControls.module.css";
import sign from "../../../assets/images/sign4.jpg"
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators";

type CommonFieldPropsType = {
    label: string | null
    children: React.ReactNode
}

export type FieldType = WrappedFieldProps & CommonFieldPropsType


const FormControl: React.FC<FieldType> = ({ meta: { touched, error }, label, children }) => {
    // debugger
    const hasError = touched && error;
    return (
        <div className={hasError ? css.errorField : ''}>
            <label className={css.label}>{label}</label>
            <div className={(hasError ? (css.Text + ' ' + css.errorText) : css.Text)}>
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



export const Textarea: React.FC<FieldType> = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<FieldType> = (props) => {

    const { input, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


/* Form Patern */

export function createField<FormKeysType extends string> (error: string | null,
    name: FormKeysType,
    label: string | null,
    component: React.FC<FieldType> | "input" | "select" | "textarea" | undefined,
    type: string,
    placeholder: string | undefined,
    autocomplete: string,
    validate: Array<FieldValidatorType>,
    text = "",
    rows:number|null) {
        return <div>
        <Field
            name={name}
            label={label}
            component={component}
            type={type}
            placeholder={placeholder}
            autoComplete={autocomplete}
            validate={validate}
            rows={rows}
        /> {text}
    </div>
    }
