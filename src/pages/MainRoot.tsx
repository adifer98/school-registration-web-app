import {Outlet} from "react-router-dom";
import AlertMessage from "../components/AlertMessage.tsx";

export default function MainRoot() {
    return (
        <>
            <div className="app" >
                <Outlet/>
            </div>

            <AlertMessage />
        </>
    )
}
