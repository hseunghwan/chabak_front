import React, { useState, useEffect, useRef } from "react";
import colors from "src/const/colors";

import PlaceListCard from "src/components/PlaceListCard";
import { placeBookmarkList } from "src/const/api/place";
import { PlaceModel } from "src/states/placeState";

export default function BookmarkList() {
    const [placeList, setPlaceList] = useState<PlaceModel[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        placeBookmarkList()
            .then((response) => {
                setPlaceList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
