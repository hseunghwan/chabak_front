import { TextField } from "@mui/material";
import React from "react";

type SignupInputProps = {
    label: string;
};

export default function SignupInput({ label }: SignupInputProps): JSX.Element {
    return <TextField fullWidth variant="outlined" required label={label} />;
}
