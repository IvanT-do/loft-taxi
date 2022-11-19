import {getClass} from "../../utils/main";

import "./NavLink.css";

export default function NavLink({ onClick, active= false, label }){
    return (
        <div className={getClass(["nav-link", {"nav-link_active": active}])} onClick={onClick}>
            { label }
        </div>
    );
}