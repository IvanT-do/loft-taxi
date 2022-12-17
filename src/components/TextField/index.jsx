import React from "react";
import {getClass} from "../../utils/main";
import PropTypes from "prop-types";

import "./TextField.css";

export default function TextField({type="text", placeholder, helperText, id, name, label, onChange, value, error=false, size="normal", ...other}){
    const isSmall = size === "small";
    return (
        <div className={getClass("text-field", {"text-field_invalid": error, "text-field_small": isSmall})}>
            <label
                className={getClass("text-field__label", {"text-field__label_small": isSmall})}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={getClass("text-field__input", {"text-field__label_input": isSmall})}
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                size={1}
                {...other}
            />
            <div className="text-field__helper">{helperText}</div>
        </div>
    );
}

TextField.propTypes = {
    type: PropTypes.oneOf([
        "button",
        "checkbox",
        "file",
        "hidden",
        "image",
        "password",
        "radio",
        "reset",
        "submit",
        "text",
        "email"
    ]),
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
    error: PropTypes.bool
}