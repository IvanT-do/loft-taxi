import LogoImage from "../Logo/LogoImage";
import LogoText from "../Logo/LogoText";
import NavLink from "../NavLink";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../store/mainSlice";

import "./Header.css";

export const links = [
    {
        label: "Карта",
        page: "/"
    },
    {
        label: "Профиль",
        page: "/profile"
    }
];

export default function Header(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (page) => () => navigate(page);

    const logoutHandle = () => dispatch(logout());

    return (
        <header className="header">
            <div className="header__logo">
                <LogoImage />
                <LogoText />
            </div>
            <div className="header__nav">
                {
                    links.map(({label, page}) => (
                        <NavLink
                            key={page}
                            active={!!matchPath(location.pathname, page)}
                            label={label}
                            onClick={navigateTo(page)}
                        />
                    ))
                }
                <NavLink
                    label="Выйти"
                    onClick={logoutHandle}
                />
            </div>
        </header>
    );
}