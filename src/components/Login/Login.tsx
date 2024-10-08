import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {loginU} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'
import React from "react";

type MapDispatchToPropsType = {
    loginU: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean | null
}
type StateType = {
    auth: MapStateToPropsType
}
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType
type CaptchaUrlType = {
    captchaUrl: string | null
}
export type LoginFormDataType = {
    captcha: string | null
    email: string | null
    password: string | null
    rememberMe: boolean

}
type LoginFormKeyType = Extract<keyof LoginFormDataType, string>
const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.loginU(formData.email, formData.password, formData.rememberMe, formData.captcha) //callback loginU
    }
    if (props.isAuth) return <Navigate to={'/profile'}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    )
}
const maxLength40 = maxLengthCreator(40)
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, CaptchaUrlType> & CaptchaUrlType> = ({
                                                                                                        handleSubmit,
                                                                                                        error,
                                                                                                        captchaUrl
                                                                                                    }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormKeyType>('Email', "email", [required, maxLength40], Input)}
            {createField<LoginFormKeyType>('Password', 'password', [required, maxLength40], Input, {type: 'password'})}
            {createField<LoginFormKeyType>('', 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input)}
            {error &&
                <div className={s.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormDataType, CaptchaUrlType>({form: 'login'})(LoginForm)
const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {loginU})(Login) //function loginU