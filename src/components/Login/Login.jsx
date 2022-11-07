import React from "react";
import css from '../Login/Login.module.css'

import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../utils/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { connect } from 'react-redux/es/exports';
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import sign from "./../../assets/images/sign4.jpg"


const Login = (props) => {
    const onSubmit = (formData) => {
        // debugger
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div >
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}






const LoginForm = (props) => {
    const maxLength50 = maxLengthCreator(50)
    const maxLength20 = maxLengthCreator(20)

    return <form className={css.loginForm} onSubmit={props.handleSubmit}>
        <h2 className={css.formHead}>Login</h2>
        <div className={props.error ? css.errorField : ''}>
            <Field
                name='email'
                label='LOGIN'
                component={Input}
                type='text'
                placeholder="your registered email"
                validate={[required, maxLength50]}
            />
        </div>
        <p></p>
        <div className={props.error ? css.errorField : ''}>
            <Field
                name='password'
                label='PASSWORD'
                component={Input}
                type='password'
                placeholder="your password"
                validate={[required, maxLength20]}
            />
        </div>
        <p></p>
        <div>
            <Field
                name='rememberMe'
                component='input'
                type='checkbox'
            />
            remember me
        </div>
    {props.error &&
    <div className={css.formError}>
            <img className={css.errorSignPic} src={sign} alt="" />
            <span className={css.errorSpan}> {props.error} </span>
        </div>
        
    }
        

        <div>
            <button className={css.loginButton} >Login</button>
        </div>
    </form>
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);