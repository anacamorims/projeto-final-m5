import { InputAdornment, TextField } from "@mui/material";
import InputMask from "react-input-mask"; // Importa o InputMask
import style from "./InputForm.module.css";

export default function InputForm({ label, type, icon: IconComponent, name, mask, value, onChange }) {
    return (
        <>
            <label className={style.label__form}>{label}</label>
            {/* Verifica se a máscara está presente */}
            {mask ? (
                <InputMask mask={mask} value={value} onChange={onChange}>
                    {() => (
                        <TextField
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {IconComponent && <IconComponent fontSize="inherit" />}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: "95%",
                                m: 1,
                                boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.2)",
                                "& fieldset": { border: "none" }
                            }}
                        />
                    )}
                </InputMask>
            ) : (
                <TextField
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {IconComponent && <IconComponent fontSize="inherit" />}
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: "95%",
                        m: 1,
                        boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.2)",
                        "& fieldset": { border: "none" }
                    }}
                />
            )}
        </>
    );
}
