import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";


export default function Root() {
    return (
        <div className="app">
            <MainNavigation />
            <Outlet />
        </div>
    )
}