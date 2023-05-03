import React, { ClassAttributes, InputHTMLAttributes } from "react";
import css from "./FormsControls.module.css";
import sign from "../../../assets/images/sign4.jpg"
import { FieldHookConfig, useField } from "formik";

type TextFieldProps = {
    label?: string,
    text?: string
};


export const MyFormikField: React.FC<TextFieldProps & InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> &
    FieldHookConfig<string>> = ({ label, ...props }) => {
        const [field, meta, helpers] = useField(props)
        const hasError = meta.touched && meta.error


        return (
            <div className={hasError ? css.errorField : ''}>
                <label className={css.label} >{label}</label>
                <div className={(hasError ? (css.Text + ' ' + css.errorText)
                    : (props.type === 'checkbox' ? css.classCheckboxText : css.Text))}>

                    <input {...field} {...props} /> {props.text}
                </div>

                {hasError &&
                    <div className={css.warningWrap}>
                        <img className={css.errorSignPic} src={sign} alt="" />
                        <span className={css.errorSpan}>{meta.error}</span>
                    </div>
                }

            </div>
        )
    }



