import { InputAdornment, TextField } from "@mui/material";
import style from "./InputForm.module.css";

export default function InputForm({ label: label, type, icon: IconComponent, onChange }) {
    return (
        <>
            <label className={style.label__form}>{label}</label>
            <TextField
                type={type}
                onChange={onChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {IconComponent && <IconComponent fontSize="inherit" />}
                            </InputAdornment>
                        ),
                        sx: {
                            boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.2)",
                            "& fieldset" : {
                                border: "none"
                            }
                        }
                    },
                    inputLabel: {
                        shrink: true
                    }
                }}
                sx={{  width: "95%", m: 1 }}
            />
        </>
    )
}