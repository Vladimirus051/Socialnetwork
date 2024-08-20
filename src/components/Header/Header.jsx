import s from "./Header.module.css";
import {NavLink} from "react-router-dom";


const Header = (props) => {
    debugger
    return <header className={s.header}>
        <img
            src='data:image/png;base64,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'/>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}
export default Header;