import React from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import FormContainer from "src/components/FormContainer";
import colors from "src/const/colors";
import SwipeableViews from "react-swipeable-views";
import RegisterPlaceByMap from "src/pages/RegisterPlaceByMap";
import RegisterPlaceByAddress from "src/pages/RegisterPlaceByAddress";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default function RegisterPlace() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <FormContainer title="차박지 등록" sx={{ display: "block" }}>
            <Box sx={{ position: "sticky", top: "66px", backgroundColor: colors.FORMBACKGROUND, zIndex: 1 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { background: `${colors.MAIN}` } }}
                >
                    <Tab label="주소로 위치 선택" {...a11yProps(0)} />
                    <Tab label="지도로 위치 선택" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <RegisterPlaceByAddress />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <RegisterPlaceByMap />
                </TabPanel>
            </SwipeableViews>
        </FormContainer>
    );
}
