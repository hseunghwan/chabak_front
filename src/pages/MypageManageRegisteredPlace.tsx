import React, { useState, useEffect, useRef } from "react";
import colors from "src/const/colors";
import RegisteredPlaceCard from "src/components/RegisteredPlaceCard";
import { getUserPlaceById, UserPlaceModel } from "src/const/api/userPlace";
import { useRecoilValue } from "recoil";
import userState from "src/states/userState";
import RegisteredPlace from "src/pages/RegisteredPlace";
import { IconButton, Toolbar } from "@mui/material";
import { CustomImg } from "src/components/CustomImg";
import icon from "src/const/icons";

type MypageManageRegisteredPlaceProps = {
    setShowUserPlaceList?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MypageManageRegisteredPlace({ setShowUserPlaceList }: MypageManageRegisteredPlaceProps) {
    const user = useRecoilValue(userState);
    const [userPlaceList, setUserPlaceList] = useState<UserPlaceModel[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);
    const [isPlaceListMode, setIsPlaceListMode] = React.useState<boolean>(true); //true면 placeList, false면 placeDetail
    const [selectedPlace, setSelectedPlace] = React.useState<UserPlaceModel>({} as UserPlaceModel); //placeDetail일 때 선택된 placeId

    useEffect(() => {
        //메인페이지면 모든 userPlaceList를 받아오도록 수정해야함
        if (user) {
            getUserPlaceById(user.user_id)
                .then((response) => {
                    setUserPlaceList(response.data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [user]);

    //무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "20px", threshold: 1.0 }
        );

        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, []);
    const itemPerPage = 10;
    const displayedItems = userPlaceList.slice(0, itemPerPage * page);

    return isPlaceListMode ? (
        <div style={{ backgroundColor: colors.FORMBACKGROUND, paddingBottom: 10 }}>
            {setShowUserPlaceList && (
                <Toolbar sx={{ color: colors.MAIN, borderBottom: `solid ${colors.MAIN}`, padding: 0 }}>
                    <IconButton onClick={() => setShowUserPlaceList(false)} color="inherit">
                        <CustomImg src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                    </IconButton>
                    <span style={{ fontSize: "24px" }}>사용자 등록 차박지</span>
                </Toolbar>
            )}
            <div>
                {/* 무한스크롤 구현 */}
                {displayedItems !== undefined &&
                    typeof displayedItems === "object" &&
                    displayedItems.map((userPlace) => (
                        <RegisteredPlaceCard
                            key={userPlace.userPlaceId}
                            userPlace={userPlace}
                            setSelectedPlace={setSelectedPlace}
                            setIsPlaceListMode={setIsPlaceListMode}
                        />
                    ))}
                <div ref={loader}></div>
            </div>
        </div>
    ) : (
        <RegisteredPlace place={selectedPlace} setIsPlaceListMode={setIsPlaceListMode} />
    );
}
