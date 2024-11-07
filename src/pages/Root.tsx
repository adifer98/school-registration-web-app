import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";
import AlertMessage from "../components/AlertMessage.tsx";

export default function Root() {
    return (
        <div className="app">
            <AlertMessage />
            <MainNavigation />
            <Outlet />
        </div>
    )
}