import * as React from "react";
import Button from "@mui/material/Button";
import Input, { InputProps, inputClasses } from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import colors from "src/const/colors";

export const CustomInput = React.forwardRef(function CustomInput(props: InputProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const { slots, ...other } = props;
    return (
        <Input
            slots={{
                root: StyledInputRoot,
                input: StyledInputElement,
                ...slots,
            }}
            {...other}
            ref={ref}
        />
    );
});

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export default function SimpleInput() {
    const [values, setValues] = React.useState<State>({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <CustomInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
                <InputAdornment>
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
}

const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    900: "#1A2027",
};

const StyledInputRoot = styled("div")(`
  width: 75%;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${grey[500]};
  background: #D9D9D9;
  border: 1px solid ${grey[200]};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${colors.MAIN};
  }

  &:hover {
    border-color: ${colors.MAIN};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`);

const StyledInputElement = styled("input")(`
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 6px 12px;
  outline: 0;
`);

const IconButton = styled(Button)(`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${grey[700]};
  `);

const InputAdornment = styled("div")`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;
