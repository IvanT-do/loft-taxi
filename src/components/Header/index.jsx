import LogoImage from "../Logo/LogoImage";
import LogoText from "../Logo/LogoText";
import NavLink from "../NavLink";
import {useAuth} from "../../utils/AuthProvider";
import PropTypes from "prop-types";

import "./Header.css";

export const links = [
    {
        label: "Карта",
        page: "home"
    },
    {
        label: "Профиль",
        page: "profile"
    }
];

export default function Header({ onNavigate, currentPage }){

    const auth = useAuth();

    const navigateTo = (page) => () => onNavigate(page);

    const logoutHandle = () => auth.logout();

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
                            active={page === currentPage}
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

Header.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired
}