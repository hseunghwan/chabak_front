import React, { useEffect, useRef, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import AppToolbar from "src/components/AppToolbar";
import HomeContentBox from "src/components/HomeContentBox";

type HomeContainerProps = {
    sx?: SxProps<Theme>;
};
const HomeContainer = ({ sx }: HomeContainerProps): JSX.Element => {
    const parentRef = useRef<HTMLElement>(null);
    const [parentWidth, setParentWidth] = useState<number>(0);

    useEffect(() => {
        // AppToolbar의 width를 계산하기 위해 parent의 width를 계산한다.
        const updateParentWidth = () => {
            if (parentRef.current) {
                const width = parentRef.current.clientWidth;
                setParentWidth(width);
            }
        };

        updateParentWidth();
        window.addEventListener("resize", updateParentWidth);
        return () => {
            window.removeEventListener("resize", updateParentWidth);
        };
    }, []);

    return (
        <Box ref={parentRef} sx={{ ...sx, position: "relative", width: "45%", height: "100%" }}>
            <AppToolbar parentWidth={parentWidth} />
            <Box>
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
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
                <HomeContentBox title="이런 곳은 어때요?" />
            </Box>
        </Box>
    );
};
export default HomeContainer;
