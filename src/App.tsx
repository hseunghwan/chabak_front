import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "src/pages/Home";
import Error from "src/pages/Error";
import Mypage from "src/pages/Mypage";
import BackgroundContainer from "src/components/BackgroundContainer";
import HomeContainer from "src/components/HomeContainer";
import PlaceDetail from "src/components/PlaceDetail";
//import Filter from "src/pages/Filter";
import PrivateRoute from "src/pages/PrivateRoute";
import HomeContents from "src/components/HomeContents";
import Login from "src/pages/Login";
import Signup from "src/pages/Signup";
import Settings from "src/pages/Settings";
import RegisterPlace from "src/pages/RegisterPlace";
import SearchFilter from "src/pages/SearchFilter";
import RegisteredPlace from "src/pages/RegisteredPlace";
import PlaceSearchResult from "src/pages/PlaceSearchResult";
import { useSetRecoilState } from "recoil";
import placeState from "src/states/placeState";
import { placeListByLocation } from "src/const/api/place";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                element: <HomeContainer />,
                children: [
                    { index: true, element: <HomeContents /> },
                    { path: "/placedetail/:id", element: <PlaceDetail /> },
                    { path: "/registeredplace/:id", element: <RegisteredPlace /> },
                    { path: "/SearchFilter", element: <SearchFilter /> },
                    { path: "/placesearchresult/:showfilter", element: <PlaceSearchResult /> },
                ],
            },
        ],
    },
    { path: "/registerplace", element: <PrivateRoute />, children: [{ index: true, element: <RegisterPlace /> }] },
    { path: "/mypage", element: <PrivateRoute />, children: [{ index: true, element: <Mypage /> }] },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/settings", element: <PrivateRoute />, children: [{ index: true, element: <Settings /> }] },
]);

export default function App() {
    const setPlaceList = useSetRecoilState(placeState);
    console.log("App.tsx");
    placeListByLocation("전국")
        .then((response) => {
            setPlaceList(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    return (
        <BackgroundContainer>
            <RouterProvider router={router} />
        </BackgroundContainer>
    );
}
