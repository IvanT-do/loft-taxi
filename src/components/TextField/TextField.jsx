import React from "react";

import "./TextField.css";
import {getClass} from "../../utils/main";

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