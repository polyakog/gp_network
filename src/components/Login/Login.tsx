import React from "react";
import css from '../Login/Login.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../utils/validators";
import { createField, GetStringKeys, Input } from "../common/FormsControls/FormsControls";
import { connect } from 'react-redux';
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import sign from "./../../assets/images/sign4.jpg"
import { AppStateType } from "../../redux/redux-store";

type LoginFromOwnPropsType = {
    captureUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFromOwnPropsType> & LoginFromOwnPropsType>
    = ({ handleSubmit, error, captureUrl }) => {

        // try {
        const maxLength50 = maxLengthCreator(50)
        const maxLength20 = maxLengthCreator(20)

        return <form className={css.loginForm} onSubmit={handleSubmit}>
            <h2 className={css.formHead}>Login</h2>

            {createField<LoginFormValueTypeKeys>(error, 'email', 'LOGIN', Input, 'text', 'your registered email', 'username', [required, maxLength50], '', null)}
            <p></p>
            {createField<LoginFormValueTypeKeys>(error, 'password', 'PASSWORD', Input, 'password', 'your password', 'current-password', [required, maxLength20], '', null)}
            <p></p>
            {createField<LoginFormValueTypeKeys>(null, 'rememberMe', '', 'input', 'checkbox', undefined, '', [], 'remember me', null)}

            {error &&
                <div className={css.formError}>
                    <img className={css.errorSignPic} src={sign} alt="error" />
                    <span className={css.errorSpan}> {error} </span>
                </div>
            }

            {captureUrl &&
                <div>
                    <label className={css.captureLabel} >Capture:</label>
                    <img src={captureUrl} className={css.capturePic} alt="capture" />
                    {createField<LoginFormValueTypeKeys>(error, 'capture', '', Input, 'text', 'Enter the capture', '', [required, maxLength50], '', null)}
                </div>
            }

            <div>
                <button className={css.loginButton} >Login</button>
            </div>
        </form>

        // } catch (error: any) {
        //     alert(`Ошибка \n Название: ${error.name} \n Сообщение: ${error.message} \n Stack:${error.stack} `)

        // }

    }

const LoginReduxForm = reduxForm<LoginFormValueType, LoginFromOwnPropsType>({ form: 'login' })(LoginForm)


type MapStateToPropsType = {
    isAuth: boolean
    captureUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, capture: string | null) => void
}

type LoginFormValueType = {
    email: string
    password: string
    rememberMe: boolean
    capture: string | null
}

type LoginFormValueTypeKeys = GetStringKeys<LoginFormValueType> 

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValueType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.capture)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return <div >
        <LoginReduxForm onSubmit={onSubmit} captureUrl={props.captureUrl} />
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captureUrl: state.auth.captureUrl
})

export default connect(mapStateToProps, { login })(Login);