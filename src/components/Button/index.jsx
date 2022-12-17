import React from "react";
import {getClass} from "../../utils/main";
import PropTypes from "prop-types";

import "./Button.css";

export default function Button({ disabled = false, onClick, children, type="button"}){
    return (
        <button
            className={getClass("button", {"button_disabled": disabled})}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"])
}