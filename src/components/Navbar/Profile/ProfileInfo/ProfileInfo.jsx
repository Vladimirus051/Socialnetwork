import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import user_asset from '../../../../assets/images/users_asset_image.png'
import {useState} from "react";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhotoFile, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoFile(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })

        //setEditMode(false)
    }
    return <div>
        <div className={s.description}>
            <div>
                <img src={profile.photos.large || user_asset} className={s.mainPhoto}/>
            </div>
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            {editMode ? <ProfileDataReduxForm onSubmit={onSubmit} profile={profile} initialValues={profile}/> :
                <ProfileData
                    activateEditMode={() => setEditMode(true)}
                    profile={profile}
                    isOwner={isOwner}/>}

        </div>
    </div>

}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={activateEditMode}>edit</button>
            </div>}
            <h3>Fullname: {profile.fullName}</h3>
            <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
            <div>About me: {profile.aboutMe}</div>
            <div>My professional skills: {profile.lookingForAJobDescription}</div>
            <div>
                <div>Contacts:</div>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}


export const Contact = ({contactTitle, contactValue}) => {

    return (
        <div className={s.contact}>
            {contactTitle}: {contactValue}
        </div>
    )
}
export default ProfileInfo;