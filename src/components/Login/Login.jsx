import React from "react";
import css from '../Login/Login.module.css'
import { reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../utils/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { connect } from 'react-redux';
// import { connect } from 'react-redux/es/exports';
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import sign from "./../../assets/images/sign4.jpg"


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.capture)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return <div >
        <LoginReduxForm onSubmit={onSubmit} captureUrl={props.captureUrl} />
    </div>
}



const LoginForm = ({handleSubmit, error, captureUrl}) => {
    const maxLength50 = maxLengthCreator(50)
    const maxLength20 = maxLengthCreator(20)

    try {
        
        return <form className={css.loginForm} onSubmit={handleSubmit} enctype="multipart/form-data">
        <h2 className={css.formHead}>Login</h2>
       
        {createField(error, 'email', 'LOGIN', Input, 'text', 'your registered email', 'username', [required, maxLength50], '')} 
        <p></p>
        {createField(error, 'password', 'PASSWORD', Input, 'password', 'your password', 'current-password', [required, maxLength20], '')} 
        <p></p>
        {createField(null, 'rememberMe', '', 'input', 'checkbox', '', '', [], 'remember me')} 

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
            {createField(error, 'capture', '', Input, 'text', 'Enter the capture', '', [required, maxLength50], '')} 
        </div>  
        }

         <div>
            <button className={css.loginButton} >Login</button>
        </div>
    </form>

} catch (error) {
       alert (`Ошибка \n Название: ${error.name} \n Сообщение: ${error.message} \n Stack:${error.stack} `)
        
    }
    
    
}

    



const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captureUrl: state.auth.captureUrl
})

export default connect(mapStateToProps, { login })(Login);