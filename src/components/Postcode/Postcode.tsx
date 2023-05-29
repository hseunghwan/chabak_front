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
        <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignContent: "center", gap: "10px" }}>
            <Helmet>
                <script type="text/javascript" src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            </Helmet>
            <Button onClick={handleClick}>우편번호 찾기</Button>
            <CustomInput type="text" value={address.postcode} placeholder="우편번호" readOnly />
            <CustomInput type="text" value={address.address} placeholder="주소" readOnly />
            <CustomInput
                type="text"
                value={address.detailAddress}
                placeholder="상세주소"
                onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
            />
            <CustomInput type="text" value={address.extraAddress} placeholder="참고항목" readOnly />
        </Box>
    );
};

export default Postcode;
