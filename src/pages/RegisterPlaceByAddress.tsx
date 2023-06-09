import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { CustomInput } from "src/components/SimpleInput";
import Postcode from "src/components/Postcode/Postcode";
import { userPlaceRegister, UserPlaceRegisterModel } from "src/const/api/userPlace";
import { getCoordinates } from "src/const/api/geocord";
import userState from "src/states/userState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom"; //useLocation,

type Address = {
    postcode: string;
    address: string;
    detailAddress: string;
    extraAddress: string;
};

export default function RegisterPlaceByAddress() {
    const [geoAddress, setGeoAddress] = useState<Address>({
        postcode: "",
        address: "",
        detailAddress: "",
        extraAddress: "",
    });

    const address = geoAddress.address + geoAddress.detailAddress;
    const [userPlaceName, setUserPlaceName] = useState("");
    const [descript, setDescript] = useState("");
    const [tags, setTags] = useState("");
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(address && userPlaceName && descript && tags)) {
            return alert("모든 항목을 입력해주세요.");
        }
        user &&
            getCoordinates(address)
                .then((response) => {
                    if (response.data.status === "OK" && response.data.addresses.length > 0) {
                        const latitude = response.data.addresses[0].y;
                        const longitude = response.data.addresses[0].x;

                        const setData: UserPlaceRegisterModel = { address, userPlaceName, descript, tags, latitude, longitude };

                        userPlaceRegister(setData, user.user_id)
                            .then((response) => {
                                console.log("Register success");
                                alert("차박지 등록이 완료되었습니다.");
                                navigate("/");
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    } else {
                        console.error("Could not fetch coordinates");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
    };
    return (
        <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignContent: "center" }}>
            <span style={{ fontSize: "1.5rem", marginBottom: "10px" }}>주소로 위치 선택</span>
            <Postcode address={geoAddress} setAddress={setGeoAddress} />
            {/* 지도, 주소 api */}

            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem", marginBottom: "5px" }}>차박지 이름</span>
            <CustomInput value={userPlaceName} onChange={(e) => setUserPlaceName(e.target.value)} />
            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem", marginBottom: "5px" }}>차박지 설명</span>
            <CustomInput value={descript} onChange={(e) => setDescript(e.target.value)} sx={{ height: "200px", overflow: "auto" }} />
            <span style={{ fontSize: "0.8rem", marginLeft: "1rem", marginTop: "1rem", marginBottom: "5px" }}>해시태그</span>
            <CustomInput value={tags} onChange={(e) => setTags(e.target.value)} />
            <Button type="submit">등록</Button>
        </Box>
    );
}
