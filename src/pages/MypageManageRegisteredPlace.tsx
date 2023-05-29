import React, { useState, useEffect, useRef } from "react";
import colors from "src/const/colors";
import PlaceListCard from "src/components/PlaceListCard";
import { getUserPlaceById, UserPlaceModel } from "src/const/api/userPlace";
import { useRecoilValue } from "recoil";
import userState from "src/states/userState";
import car from "src/resource/img/car.svg";

export default function MypageManageRegisteredPlace() {
    const user = useRecoilValue(userState);
    const [placeList, setPlaceList] = useState<UserPlaceModel[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (user) {
            getUserPlaceById(user.user_id)
                .then((response) => {
                    setPlaceList(response.data);
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
    const displayedItems = placeList.slice(0, itemPerPage * page);

    return (
        <div style={{ backgroundColor: colors.FORMBACKGROUND, paddingBottom: 10 }}>
            <div>
                {/* 무한스크롤 구현 */}
                {displayedItems !== undefined &&
                    typeof displayedItems === "object" &&
                    displayedItems.map((place) => (
                        <PlaceListCard
                            key={place.userplace_id}
                            placeId={place.userplace_id + ""}
                            theme={place.descript || ""}
                            name={place.userplace_name || ""}
                            address={place.address || ""}
                            imgUrl={car}
                        />
                    ))}
                <div ref={loader}></div>
            </div>
        </div>
    );
}
