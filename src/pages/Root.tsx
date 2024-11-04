import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";

export default function Root() {
    return <>
        <MainNavigation />
        <Outlet />
    </>
}