import React from "react";
import css from "./FormsControls.module.css";
import sign from "../../../assets/images/sign4.jpg"


const FormControl = ({ input, meta: { touched, error }, ...props }) => {
    // debugger
    const hasError = touched && error;
    return (
        <div >
            <label className={css.label}>{props.label}</label>

            <div className={(hasError ? css.errorTextarea : " ")}>
                {props.children}
            </div>

            {touched && error && <div className={css.warningWrap}>
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