import React from "react";
import {InputAdornment, MenuItem, Select as MuiSelect} from "@mui/material";

export default function Select({label, startAdornment, options, sx, ...props}){
    return (
        <MuiSelect
            {...props}
            fullWidth
            sx={{
                outline: "none",
                border: "none",
                borderRadius: 0,
                "& .MuiSelect-select":{
                  pl: "10px"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    outline: "none",
                    border: "none",
                },
                ...sx
            }}
            startAdornment={startAdornment && (
                <InputAdornment position="start">
                    {startAdornment}
                </InputAdornment>
            )}
        >
            {
                options.map((item, i) => <MenuItem key={item + i} value={item}>{item}</MenuItem>)
            }
        </MuiSelect>
    );
}