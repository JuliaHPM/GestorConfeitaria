import React, { useState } from "react";
import { Checkbox as Cbox, FormControlLabel } from "@mui/material";

export default function Checkbox({ label = '', controller, checked, disabled }) {


    return (
        <FormControlLabel
            label={label}
            control={
                <Cbox
                    disabled={disabled}
                    componentsProps={{ typography: { variant: 'subtitle2' } }}
                    checked={checked}
                    onChange={controller}
                    size="small"
                    sx={{
                        color: "#7b7b7b",
                        '&.Mui-checked': {
                            color: "#f453a9",
                        }
                    }}
                />
            }
        />
    )
}