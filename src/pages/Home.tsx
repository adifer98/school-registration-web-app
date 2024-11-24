import {Button} from "@mui/material";
import LOGO from "../images/logo.jpg"
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className="home">

            <header className="home-header">
                <img src={LOGO} alt="nice-logo"/>
                <div className="actions">
                    <Button variant="contained" color="primary" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>Sign up</Button>
                </div>
            </header>
            <div className="container">

                <div><h1>Manage Courses, Track Progress, Empower Education</h1></div>

                <div><p>
                    Join a community of students and admins transforming education.
                    Our platform helps you easily manage courses, track progress, and connect students with instructors.
                    Sign up today to make learning and teaching simpler and more efficient!
                </p></div>

                <Button variant="outlined" onClick={() => navigate('/signup')}>I want to create an account</Button>
            </div>

        </div>
    )
}