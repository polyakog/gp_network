import React from "react";
import css from '../Login/Login.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from "../../utils/validators";
import { Input } from "../common/FormsControls/FormsControls";


const Login = (props) => {

    const onSubmit = (formData) => {
        debugger
        console.log(formData)
    }

    return <div className={css.wrapper}>
        <h2>Login</h2>
        <div>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    </div>
}

const LoginForm = (props) => {
    const maxLength15 = maxLengthCreator(15)
    const maxLength20 = maxLengthCreator(20)
    
    return <form onSubmit={props.handleSubmit}>
        <div>
            {/* <label >LOGIN</label> */}
            <div>
                <Field
                    name='login'
                    label='Login'
                    component={Input}
                    type='text'
                    placeholder="your login name"
                    validate={[required, maxLength15]}

                />
                <p></p>
            </div>
        </div>
        <div>
            {/* <label >PASSWORD</label> */}
            <div>
                
                <Field
                    name='password'
                    label='PASSWORD'
                    component={Input}
                    type='text'
                    placeholder="your password"
                    validate={[required, maxLength20]}
                />
            </div>

        </div>
        <div>
            <Field
                name='rememberMe'
                component='input'
                type='checkbox'
                
            />
            remember me
        </div>
        <div>
            <button className={css.loginButton} >Login</button>
        </div>


    </form>
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default Login;