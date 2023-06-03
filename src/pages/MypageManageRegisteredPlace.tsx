import React, { useState, useEffect, useRef } from "react";
import colors from "src/const/colors";
import RegisteredPlaceCard from "src/components/RegisteredPlaceCard";
import { getUserPlaceById, getAllUserPlace, UserPlaceModelWithEmail } from "src/const/api/userPlace";
import { useRecoilValue } from "recoil";
import userState from "src/states/userState";
import { IconButton, Toolbar } from "@mui/material";
import { CustomImg } from "src/components/CustomImg";
import icon from "src/const/icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function MypageManageRegisteredPlace() {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const location = useLocation();
    const [userPlaceList, setUserPlaceList] = useState<UserPlaceModelWithEmail[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        //메인페이지면 모든 userPlaceList를 받아오도록 수정해야함
        location.pathname === "/registeredplacelist"
            ? getAllUserPlace()
                  .then((response) => {
                      setUserPlaceList(response.data);
                  })
                  .catch((error) => {
                      console.error(error);
                  })
            : getUserPlaceById(user!.user_id)
                  .then((response) => {
                      setUserPlaceList(response.data);
                  })
                  .catch((error) => {
                      console.error("Error:", error);
                  });
    }, [location.pathname, user]);

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

    return (
        <div style={{ backgroundColor: colors.FORMBACKGROUND, paddingBottom: 10 }}>
            {location.pathname === "/registeredplacelist" && (
                <Toolbar sx={{ color: colors.MAIN, borderBottom: `solid ${colors.MAIN}`, padding: 0 }}>
                    <IconButton onClick={() => navigate(-1)} color="inherit">
                        <CustomImg src={icon.backicon} alt="backicon" style={{ marginRight: "20px" }} />
                    </IconButton>
                    <span style={{ fontSize: "24px" }}>사용자 등록 차박지</span>
                </Toolbar>
            )}
            <div>
                {/* 무한스크롤 구현 */}
                {displayedItems !== undefined && typeof displayedItems === "object" ? (
                    displayedItems.map((userPlace) => <RegisteredPlaceCard key={userPlace.userPlaceId} userPlace={userPlace} />)
                ) : (
                    <div>등록된 차박지가 없습니다.</div>
                )}
                <div ref={loader}></div>
            </div>
        </div>
    );
}
