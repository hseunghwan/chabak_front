import { TextField } from "@mui/material";
import React from "react";

type SignupInputProps = {
    label: string;
    required?: boolean;
    isTypePassword?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorValue?: string;
};

export default function SignupInput({ label, required, isTypePassword, value, onChange, errorValue }: SignupInputProps): JSX.Element {
    return (
        <TextField
            variant="outlined"
            required={required}
            fullWidth
            label={label}
            name="password"
            type={isTypePassword ? "password" : "text"}
            value={value}
            onChange={onChange}
            error={errorValue !== ""}
            helperText={errorValue}
        />
    );
}
