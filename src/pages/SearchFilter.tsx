import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import placeState from "src/states/placeState";
import { placeListBySearchKeywordFilter } from "src/const/api/place";
import { useNavigate } from "react-router-dom";
import searchState from "src/states/searchState";
import colors from "src/const/colors";
import { green } from "@mui/material/colors";

const facilities = [
    { facility: "ground", title: "운동장" },
    { facility: "hotwater", title: "온수" },
    { facility: "mart", title: "마트.편의점" },
    { facility: "playzone", title: "놀이터" },
    { facility: "pool", title: "물놀이장" },
    { facility: "sports", title: "운동시설" },
    { facility: "tramp", title: "트렘폴린" },
    { facility: "volt", title: "전기" },
    { facility: "walk", title: "산책로" },
    { facility: "wifi", title: "와이파이" },
    { facility: "wood", title: "장작판매" },
];

const themes = [
    { theme: "star", title: "별" },
    { theme: "beach", title: "바다" },
    { theme: "family", title: "가족" },
    { theme: "pets", title: "반려동물" },
    { theme: "couple", title: "커플" },
    { theme: "healing", title: "힐링" },
];

const SearchFilter = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedFacilities, setSelectedFacilities] = useState<Record<string, boolean>>({});
    const [selectedThemes, setSelectedThemes] = useState<Record<string, boolean>>({});
    const setUserSearchState = useSetRecoilState(searchState);

    const setPlaceList = useSetRecoilState(placeState);
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFacilities({ ...selectedFacilities, [event.target.name]: event.target.checked });
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedThemes({ ...selectedThemes, [event.target.name]: event.target.checked });
    };

    const handleSearch = () => {
        if (!searchKeyword) {
            alert("검색어를 입력해주세요.");
            return;
        }
        const selectedFacilitiesKeys = facilities
            .filter(({ facility }) => selectedFacilities[facility])
            .map(({ facility }) => facility)
            .join(",");
        const selectedThemesTitles = themes
            .filter(({ theme }) => selectedThemes[theme])
            .map(({ title }) => title)
            .join(",");

        placeListBySearchKeywordFilter(searchKeyword, selectedThemesTitles, selectedFacilitiesKeys)
            .then((response) => {
                setPlaceList(response.data);
                setUserSearchState({ location: "전국", theme: null, facils: null, searchKeyword: null });
                navigate("/placesearchresult/true");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div style={{ backgroundColor: colors.FORMBACKGROUND, display: "flex", flexDirection: "column", padding: "20px" }}>
            <TextField value={searchKeyword} onChange={handleSearchChange} placeholder="검색어 입력" color="success" spellCheck="false" required />
            <div>
                <h3>테마</h3>
                {themes.map(({ theme, title }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedThemes[theme] || false}
                                onChange={handleThemeChange}
                                name={theme}
                                sx={{
                                    color: green[800],
                                    "&.Mui-checked": {
                                        color: green[600],
                                    },
                                }}
                            />
                        }
                        label={title}
                        key={theme}
                    />
                ))}
            </div>
            <div>
                <h3>부대시설</h3>
                {facilities.map(({ facility, title }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedFacilities[facility] || false}
                                onChange={handleFacilityChange}
                                name={facility}
                                sx={{
                                    color: green[800],
                                    "&.Mui-checked": {
                                        color: green[600],
                                    },
                                }}
                            />
                        }
                        label={title}
                        key={facility}
                    />
                ))}
            </div>
            <Button variant="contained" color="success" onClick={handleSearch}>
                검색
            </Button>
        </div>
    );
};

export default SearchFilter;
