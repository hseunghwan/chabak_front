import React from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import colors from "src/const/colors";
export default function Mypage() {
    const [value, setValue] = React.useState("one");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <FormContainer title="마이페이지" sx={{ display: "block" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                TabIndicatorProps={{ style: { background: `${colors.MAIN}` } }}
            >
                <Tab value="one" label="회원정보 수정" />
                <Tab value="two" label="차박지 관리" />
            </Tabs>
            <Typography>차박지 관리</Typography>
        </FormContainer>
    );
}
