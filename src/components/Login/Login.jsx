import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../common/FormsControls/FormsControls";
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
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'email', [required, maxLength40], Input)}
            {CreateField('Password', 'password', [required, maxLength40], Input)}
            {CreateField('', 'remember', [], Input, {type: 'checkbox'}, 'remember me')}
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
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginU})(Login) //function loginU