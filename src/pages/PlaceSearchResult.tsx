import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import placeState from "src/states/placeState";
import colors from "src/const/colors";
import PlaceListCard from "src/components/PlaceListCard";
import Filterbar from "src/components/Filterbar";

export default function PlaceSearchResult() {
    const param = useParams<{ showfilter: string }>();
    const placeList = useRecoilValue(placeState);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);

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
            {param.showfilter === "true" && <Filterbar />}
            <div>
                {/* 무한스크롤 구현 */}
                {displayedItems !== undefined &&
                    typeof displayedItems === "object" &&
                    displayedItems.map((place) => (
                        <PlaceListCard
                            key={place.place_id}
                            placeId={place.place_id}
                            theme={place.theme || ""}
                            name={place.place_name || ""}
                            address={place.address || ""}
                            imgUrl={place.images[0]}
                        />
                    ))}
                <div ref={loader}></div>
            </div>
        </div>
    );
}
