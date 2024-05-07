import React from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@emotion/react";

function SelectInput({ label, options, multiple, handleChange, value, onDelete, selectedValues, setSelectedValues, index }) {
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme?.typography?.fontWeightRegular
              : theme?.typography?.fontWeightMedium,
        };
      }
      const handleDelete = (value) => {
            console.log(value,"valllll")
            setSelectedValues({...selectedValues,[index]:selectedValues[index].filter(y => y != value)})
      }
    return (
        <>
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedValues[index]}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value?.charAt(0)?.toUpperCase() + value?.slice(1)} 
                                    //  onDelete={(value) => handleDelete()} 
                                    />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {options.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, selectedValues[index], theme)}
                            >
                                {name?.charAt(0)?.toUpperCase() + name?.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default SelectInput;