import React from "react";
import css from '../Login/Login.module.css'
import { Field, reduxForm } from 'redux-form'


const Login = (props) => {
    const onSubmit= (formData) => {
        console.log(formData)
    }

    return <div className={css.wrapper}>
        <h2>Login Form</h2>
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    </div>
   }

const LoginForm =(props) => {
    
    // const {handleSubmit} = props
    // return <form onSubmit={props.onSubmit(handleSubmit)}>
    return <form onSubmit={props.handleSubmit}> 
        <div>
            <label >Login:</label>
            <div>
              <Field name='login' component='input' type='text' placeholder="your login name"/>  
            </div>
        </div>
        <div>
            <label >Password:</label>
            <div>
                <Field name='password' component='input' type='text' placeholder="your password" />
            </div>
            
        </div>
        <div>
            <Field name='rememberMe' component='input' type='checkbox'/>
            remember me
        </div>
        <div>
            <button className={css.loginButton} >Login</button>
        </div>


    </form>
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default Login;