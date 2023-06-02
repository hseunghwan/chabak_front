/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { CustomInput } from "src/components/SimpleInput";
import { userPlaceRegister, UserPlaceRegisterModel } from "src/const/api/userPlace";
import userState from "src/states/userState";
import { useRecoilValue } from "recoil";

export default function RegisterPlaceByMap() {
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [userPlaceName, setUserPlaceName] = useState("");
    const [descript, setDescript] = useState("");
    const [tags, setTags] = useState("");
    const user = useRecoilValue(userState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // const setData: UserPlaceRegisterModel = { address, userPlaceName, descript, tags, latitude, longitude };
        // user &&
        //     userPlaceRegister(setData, user.user_id)
        //         .then((response) => {
        //             console.log("Register success");
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
    };
    return (
        <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignContent: "center" }}>
            <span style={{ fontSize: "1.5rem" }}>지도로 위치 선택</span>
            <span style={{ fontSize: "1.5rem", color: "red" }}>추후에 제공하도록 하겠습니다</span>
            {/* 지도, 주소 api */}
            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차박지 이름</span>
            <CustomInput value={userPlaceName} onChange={(e) => setUserPlaceName(e.target.value)} />
            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>차박지 설명</span>
            <CustomInput value={descript} onChange={(e) => setDescript(e.target.value)} sx={{ height: "200px", overflow: "auto" }} />
            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem" }}>해시태그</span>
            <CustomInput value={tags} onChange={(e) => setTags(e.target.value)} />
            <Button type="submit">등록</Button>
        </Box>
    );
}
