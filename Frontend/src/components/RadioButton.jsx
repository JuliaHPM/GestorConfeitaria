import { FormControlLabel, Radio } from "@mui/material";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
export function RadioButton({ value, label, icon }) {
    return (
        <FormControlLabel

            value={value}
            control={
                <Radio sx={
                    {
                        color: "#7b7b7b",
                        '&.Mui-checked': { color: "#f453a9", }
                    }
                } />}
            label={
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {icon}
                    {label}
                </div>}
        />
    )
}