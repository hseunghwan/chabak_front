import { Box, Button } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { CustomInput } from "src/components/SimpleInput";

type Address = {
    postcode: string;
    address: string;
    detailAddress: string;
    extraAddress: string;
};
type PostcodeProps = {
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
};
const Postcode: React.FC<PostcodeProps> = ({ address, setAddress }) => {
    const handleComplete = (data: any) => {
        let addr = "";
        let extraAddr = "";

        if (data.userSelectedType === "R") {
            addr = data.roadAddress;
        } else {
            addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
                extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            if (extraAddr !== "") {
                extraAddr = " (" + extraAddr + ")";
            }
        }

        setAddress({
            postcode: data.zonecode,
            address: addr,
            detailAddress: "",
            extraAddress: extraAddr,
        });
    };

    const handleClick = () => {
        // @ts-ignore
        new window.daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Helmet>
                <script type="text/javascript" src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            </Helmet>
            <div style={{ display: "flex" }}>
                <CustomInput type="text" value={address.postcode} placeholder="우편번호" readOnly />
                <Button onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
                    주소검색
                </Button>
            </div>
            <CustomInput type="text" value={address.address} placeholder="주소" readOnly sx={{ width: "100%" }} />
            <CustomInput
                type="text"
                value={address.detailAddress}
                placeholder="상세주소"
                onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
                sx={{ width: "100%" }}
            />
        </Box>
    );
};

export default Postcode;
