import {CreateField, Textarea} from "../../../common/FormsControls/FormsControls";
import {Input} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validator";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            { <div>
                <button>save</button>
            </div>}
            <h3>Fullname: {CreateField('Fullname', 'fullName', [required], Input)}</h3>
            <div>Looking for a job: {CreateField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}</div>
            <div>About me: {CreateField('About me', 'aboutMe', [], Textarea)}</div>
            <div>My professional
                skills: {CreateField('My professional skills', 'lookingForAJobDescription', [], Textarea)}</div>
            <div>
                <div>Contacts:</div>
                {/*{Object.keys(profile.contacts).map(key => {*/}
                {/*    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
                {/*})}*/}
            </div>
        </form>
    )
}
const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm