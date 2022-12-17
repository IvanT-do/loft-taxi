import React from "react";
import {Autocomplete, InputAdornment, TextField} from "@mui/material";

export default function Select({label, startAdornment, options, sx, ...props}){
    return (
        <Autocomplete
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
                    border: "none"
                },
                "& .MuiAutocomplete-clearIndicator": {
                    visibility: "visible"
                },
                ...sx
            }}
            options={options.map(value => ({label: value, value}))}
            isOptionEqualToValue={(opt, val) => opt.value === val}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: startAdornment && (
                            <InputAdornment position="start">
                                {startAdornment}
                            </InputAdornment>
                        )
                    }}
                />
            )}
        />
    );
}