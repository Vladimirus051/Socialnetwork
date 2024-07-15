import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
const setActive = ({isActive}) => isActive ? s.activeLink : "";

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id_user;

    return (
        <div className={s.dialog}>
            <NavLink to={path} className={setActive}>
                {props.nameuser}
            </NavLink>
        </div>
    )
}
export default DialogItem