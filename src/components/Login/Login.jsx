import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {loginU} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginU(formData.email, formData.password, formData.rememberMe) //callback loginU
    }
    if (props.isAuth) return <Navigate to={'/profile'}/>

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const maxLength40 = maxLengthCreator(40)
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'email'} component={Input} validate={[required, maxLength40]}/>
            </div>
            <div>
                <Field type ={'password'} placeholder={'Password'} name={'password'} component={Input} validate={[required, maxLength40]}/>
            </div>
            <div>
                <Field component={Input} name={'remember'} type={'checkbox'}/>
                remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginU})(Login) //function loginU