import React from "react";
import LogoImage from "../Logo/LogoImage";
import LogoText from "../Logo/LogoText";

import "./Sidebar.css";

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <LogoImage size="large" />
                <LogoText />
            </div>
        </div>
    );
}