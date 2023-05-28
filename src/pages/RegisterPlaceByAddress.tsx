import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { CustomInput } from "src/components/SimpleInput";
import Postcode from "src/components/Postcode/Postcode";
import { userPlaceRegister, UserPlaceRegisterModel } from "src/const/api/userPlace";
import { getCoordinates } from "src/const/api/geocord";
type Address = {
    postcode: string;
    address: string;
    detailAddress: string;
    extraAddress: string;
};

export default function RegisterPlaceByAddress() {
    const [address, setAddress] = useState<Address>({
        postcode: "",
        address: "",
        detailAddress: "",
        extraAddress: "",
    });

    const fullAddress = address.address + address.detailAddress;
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [userPlaceName, setUserPlaceName] = useState("");
    const [descript, setDescript] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getCoordinates(fullAddress)
            .then((response) => {
                if (response.data.status === "OK" && response.data.addresses.length > 0) {
                    console.log(response.data.addresses[0].y);
                    console.log(response.data.addresses[0].x);

                    setLatitude(response.data.addresses[0].y);
                    setLongitude(response.data.addresses[0].x);

                    const setData: UserPlaceRegisterModel = { fullAddress, userPlaceName, descript, tags, latitude, longitude };
                    userPlaceRegister(setData)
                        .then((response) => {
                            console.log("Register success");
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
            <span style={{ fontSize: "1.5rem" }}>주소로 위치 선택</span>
            <Postcode address={address} setAddress={setAddress} />
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
