import {CreateField, Textarea} from "../../../common/FormsControls/FormsControls";
import {Input} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validator";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from '../../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            { <div>
                <button>save</button>
            </div>}
            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}
            <h3>Fullname: {CreateField('Fullname', 'fullName', [required], Input)}</h3>
            <div>Looking for a job: {CreateField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}</div>
            <div>About me: {CreateField('About me', 'aboutMe', [], Textarea)}</div>
            <div>My professional
                skills: {CreateField('My professional skills', 'lookingForAJobDescription', [], Textarea)}</div>
            <div>
                <div>Contacts:</div>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}:</b> {CreateField(key, 'contacts.' + key, [], Input)}
                    </div>
                })}
            </div>
        </form>
    )
}
const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm