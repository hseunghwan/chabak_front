import { Box, SxProps, Theme, Typography } from "@mui/material";
import AppToolbar from "src/components/AppToolbar";
import HomeContentBox from "src/components/HomeContentBox";
import icons from "src/const/icons";

type HomeContainerProps = {
    sx?: SxProps<Theme>;
};
const HomeContainer = ({ sx }: HomeContainerProps): JSX.Element => {
    return (
        <Box sx={{ ...sx }}>
            <AppToolbar />

            <Box sx={{ backgroundColor: "#F1F9F1" }}>
                <Typography sx={{ fontSize: "20px", color: "#103223", padding: "3px" }}>AI로 쉽게 찾는 캠핑/차박지</Typography>
                <HomeContentBox title="이런 곳은 어때요?" icon={icons.campping} />
                <HomeContentBox title="이런 곳은 어때요?" icon={icons.mountain} />
                <HomeContentBox title="이런 곳은 어때요?" icon={icons.location} />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
            </Box>
        </Box>
    );
};
export default HomeContainer;
