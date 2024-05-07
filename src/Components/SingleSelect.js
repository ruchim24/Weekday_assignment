import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SingleSelect({label,value,options,handleChange}) {
    return (
        <>
            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={value}
                        label={label}
                        onChange={handleChange}
                    >
                        {options.map((name) => (
                            <MenuItem
                                key={name.label}
                                value={name.value}
                            >
                                {name.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default SingleSelect;