import React from "react";
import {getClass} from "../../utils/main";

import "./Button.css";

export default function Button({ disabled = false, onClick, children, type="button"}){
    return (
        <button
            className={getClass(["button", {"button_disabled": disabled}])}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}