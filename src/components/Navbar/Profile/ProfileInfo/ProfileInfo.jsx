import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return <div>
        <div className={s.description}>
            <div>
                <img src={profile.photos.large}/>
            </div>
            <div>{profile.fullName}</div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    </div>

}
export default ProfileInfo;