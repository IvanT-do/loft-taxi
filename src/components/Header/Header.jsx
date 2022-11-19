import LogoImage from "../Logo/LogoImage";
import LogoText from "../Logo/LogoText";
import NavLink from "../NavLink/NavLink";

import "./Header.css";

const links = [
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

    const navigateTo = (page) => () => onNavigate(page);

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
                    onClick={navigateTo("auth")}
                />
            </div>
        </header>
    );
}