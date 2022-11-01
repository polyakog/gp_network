import React from "react";
import css from "./FormsControls.module.css"

const FormControl = ({ input, meta:{ touched, error }, ...props}) => {
    // debugger
    const hasError = touched && error;
    return (
        <div >
            <label className={css.label}>{props.label}</label>
            
            <div className={(hasError ? css.errorTextarea : " ")}>
                {props.children} 
            </div>
            <div>
                {touched && error && <span className={css.errorSpan}>{error}</span>}
            </div>
            
        </div> 
    )
}

// export const Input = ({ input, meta: { touched, error }, ...props }) => {
//     // debugger
//     const hasError = touched && error;
//     return (
//         <div >
//             <label className={css.label}>{props.label}</label>

//             <div className={(hasError ? css.errorTextarea : " ")}>
//                 <input className={css.Textarea} {...input} {...props}/>
//             </div>
//             <div>
//                 {touched && error && <span className={css.errorSpan}>{error}</span>}
//             </div>

//         </div>
//     )
// }

// export const Textarea2 = ({ input, meta: { touched, error }, ...props }) => {
//     // debugger
//     const hasError = touched && error;
//     return (
//         <div >
//             <label className={css.label}>{props.label}</label>

//             <div className={(hasError ? css.errorTextarea : " ")}>
//                 <textarea className={css.Textarea} {...input} {...props} />
//             </div>
//             <div>
//                 {touched && error && <span className={css.errorSpan}>{error}</span>}
//             </div>

//         </div>
//     )
// }

export const Textarea = (props) => {
    const { input, ...restProps }=props;
    return <FormControl {...props}><textarea className={css.Textarea} {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    
    const { input, ...restProps } = props;
    return <FormControl {...props}><input className={css.Textarea} {...input} {...restProps} /></FormControl>
}