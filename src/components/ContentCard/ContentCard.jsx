import React from "react";
import {getClass} from "../../utils/main";

import "./ContentCard.css";

export default function ContentCard({children, className, ...other}){
    return (
        <div className={getClass(["content-card", ...className])} {...other}>
            {children}
        </div>
    );
}