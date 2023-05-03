import React, { useState } from "react";
import css from '../Login/Login.module.css'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    FormikErrors,
} from 'formik'
import { useDispatch, useSelector,  } from "react-redux";
import { AppDispatchType, AppStateType } from "../../redux/redux-store";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import { MyFormikField } from "../common/FormsControls/FormsControlsFormik";
import sign from "./../../assets/images/sign4.jpg"


export const LoginPage2: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captureUrl = useSelector((state: AppStateType) => state.auth.captureUrl)
    const dispatch: AppDispatchType = useDispatch()

    const onSubmit = (formData: LoginFormValueType, setStatus: (message:string)=>void) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.capture, setStatus))
    }


    if (isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <LoginForm onSubmit={onSubmit} captureUrl={captureUrl} />
    )
}


type LoginFormValueType = {
    email: string
    password: string
    rememberMe: boolean
    capture: string | null
}

const loginFormValidate = (values: LoginFormValueType) => { //ALL VALIDATIONS
    const errors: FormikErrors<LoginFormValueType> = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    // if (!values.capture) {
    //     errors.capture = 'Required';
    // }

    return errors;
}

type PropsType = {
    onSubmit: (formData: LoginFormValueType, setStatus:any ) => void
    captureUrl: string | null
}

const LoginForm = (props: PropsType) => {
    const initialValues: LoginFormValueType = { email: '', password: '', rememberMe: false, capture: '' }
    const [errorForm, setErrorForm ] = useState('')

    const submit = (values: LoginFormValueType, { setSubmitting }: { setSubmitting: (iisSubmitting: boolean) => void }) => {
        props.onSubmit(values, (message: string) => { setErrorForm(message)} )
        

        setTimeout(() => {
            setSubmitting(false);
        }, 100);
    }

    return (
        <div className={css.logingWrapper}>
            

            <Formik
                initialValues={initialValues}
                validate={loginFormValidate}

                onSubmit={submit}
            >
                {({ values, errors, touched, handleSubmit, isSubmitting, submitCount }) => (
                    <Form className={css.loginForm}>
                        <h1> Login Form</h1>
                        <MyFormikField type="email" name="email" label="LOGIN" placeholder='your registered email' autoComplete='username' />
                        <p></p>
                        <MyFormikField type="password" name="password" label="PASSWORD" placeholder='your password' autoComplete='current-password' />
                        <p></p>
                        <MyFormikField type="checkbox" name="rememberMe" text='Remember me' />
                        <p></p>

                        {errorForm &&
                            <div className={css.formError}>
                                <img className={css.errorSignPic} src={sign} alt="error" />
                                <span className={css.errorSpan}> {errorForm} </span>
                            </div>
                        }

                        {props.captureUrl &&
                            <div>
                                <label className={css.captureLabel} >Capture:</label>
                                <img src={props.captureUrl} className={css.capturePic} alt="capture" />
                                <MyFormikField type='text' name='capture' label='' placeholder='Enter the capture' autoComplete='' />

                            </div>
                        }

                        <button type="submit" disabled={isSubmitting} className={css.loginButton}>Login</button>
                        <p></p>
                        <div className={css.errorAttempts}> Number of attempts: {submitCount+1} </div>
                    </Form>
                )}
            </Formik>



        </div>
    )
}
