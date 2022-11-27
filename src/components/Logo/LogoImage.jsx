import React from "react";
import PropTypes from "prop-types";

const sizes = {
    "normal": 61,
    "large": 136
};

export default function LogoImage({size= "normal"}){
    return (
        <svg height={sizes[size]} viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M68 136C105.555 136 136 105.555 136 68C136 60.1133 134.657 52.5401 132.188 45.4967L45.4967 132.188C52.5401 134.657 60.1133 136 68 136ZM13.0509 108.065L46.416 74.7003L7.89132 36.1756C2.85364 45.6708 0 56.5022 0 68C0 82.9801 4.84392 96.8289 13.0509 108.065ZM36.1756 7.89132L74.7003 46.416L108.065 13.0509C96.8289 4.84392 82.9801 0 68 0C56.5022 0 45.6708 2.85364 36.1756 7.89132Z" fill="#FDBF5A"/>
            <g stroke="#FDBF5A" strokeWidth="4">
                <path d="M22.4142 22.5858L30.8284 31"/>
                <path d="M40.4142 109L32 117.414"/>
                <path d="M55.4142 93L47 101.414"/>
                <path d="M70.4142 77L62 85.4142"/>
                <path d="M100.414 45L92 53.4142"/>
                <path d="M115.414 29L107 37.4142"/>
                <path d="M38 38L46.4142 46.4142"/>
                <path d="M55 55L63.4142 63.4142"/>
                <path d="M85.4142 61L77 69.4142"/>
            </g>
        </svg>
    );
}

LogoImage.propTypes = {
    size: PropTypes.oneOf(Object.keys(sizes))
}