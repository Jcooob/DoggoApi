import { Link } from "react-router-dom";
import dogs2 from "../../Assets/sittingDogs.png";
import IconPaw from "../../Assets/IconPaw.png";
import TitleBar from "../TitleBar/TitleBar"
import Footer from "../Footer/Footer";
import "./LandingPage.modules.css";

const LandingPage = () => {
    return (
        <>

            <TitleBar type={"landing"} text={"Welcome to DoggoApi"}  />

            <div className="bodyLanding">

                <div className="textArea">
                    
                <div className="landingText">
                    Discover the canine universe: All breeds on a single page!
                </div>

                <Link to = {`/Dogs`}>
                    <button className = "enter-button" style = {{ display: 'flex', alignItems: 'center' }}>
                    <img src = {IconPaw} alt = "iconPaw" className = "iconPaw" />
                        <span style = {{ marginLeft: '50px' }}> Enter </span>
                    </button>
                </Link>

                </div>


                <img src = {dogs2} alt = "Some cute doggos :3" className = "portraitLanding"/>


            </div>

            <Footer />
        </>
    )
}

export default LandingPage;