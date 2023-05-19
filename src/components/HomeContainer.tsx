import AppToolbar from "src/components/AppToolbar";
import { Outlet } from "react-router-dom";

const HomeContainer = (): JSX.Element => {
    return (
        <>
            <AppToolbar />
            <Outlet />
        </>
    );
};
export default HomeContainer;
