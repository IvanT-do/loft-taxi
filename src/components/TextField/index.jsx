import React from "react";
import {getClass} from "../../utils/main";
import PropTypes from "prop-types";

import "./TextField.css";

export default function TextField({type="text", placeholder, helperText, id, name, label, onChange, value, error=false}){
    return (
        <div className={getClass(["text-field", {"text-field_invalid": error}])}>
            <label
                className="text-field__label"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="text-field__input"
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
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
        "text"
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