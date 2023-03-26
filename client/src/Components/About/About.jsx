import TitleBar from "../../Components/TitleBar/TitleBar"
import Footer from "../../Components/Footer/Footer"
import CSS from "../../Assets/TechnologiesIcons/CSS.png"
import Express from "../../Assets/TechnologiesIcons/Express.png"
import HTML from "../../Assets/TechnologiesIcons/HTML.png"
import JS from "../../Assets/TechnologiesIcons/JS.png"
import PostgreSQL from "../../Assets/TechnologiesIcons/PostgreSQL.png"
import React from "../../Assets/TechnologiesIcons/React.png"
import Redux from "../../Assets/TechnologiesIcons/Redux.png"

import "./About.modules.css"

const About = () => {
    return (
        <>
            <TitleBar type={"about"} text={"About"} />
            <div className="aboutBody">

                <div className="whatsDoggoApi">
                    <h1>What's DoggoApi?</h1>
                    <p>
                        DoggoApi is a website dedicated to providing information about dog breeds
                        from all over the world. We are committed to our users and their knowledge
                        about man's best friend. Whether you want to make the right choice to
                        pick the ideal new member of your family or just want to learn about these
                        wonderful animals, you will find all the information you need here on DoggoApi.
                    </p>
                </div>

                <div className="howDoesItWork">
                    <h1>How does DoggoApi work?</h1>
                    <p>
                        All of the information shown on this page is extracted from the Dogs API, a place where
                        people and companies can extract information related to breeds of dogs. We also have 
                        our own database, which we use to store the breeds created by our users. 
                    </p>
                </div>

                <div className="technologiesUsed">
                    <h1>Technologies used</h1>
                    <p>
                        These are all the technologies that we have used to make this page a usefull tool for our all
                        and each one of our users.
                    </p>
                </div>

                <div className="technologiesIcons">

                    <div className="techSection">
                        <img src={JS} alt="Javascript" className="techUsedIcon"/>
                        <p>Javascipt</p>
                    </div>

                    <div className="techSection"> 
                        <img src={HTML} alt="HTML" className="techUsedIcon"/>
                        <p>HTML</p>
                    </div>
                    
                    <div className="techSection"> 
                        <img src={CSS} alt="CSS" className="techUsedIcon"/>
                        <p>CSS</p>
                    </div>

                    <div className="techSection">
                        <img src={React} alt="React" className="techUsedIcon"/>
                        <p>React</p>
                    </div>

                    <div className="techSection">
                        <img src={Redux} alt="Redux" className="techUsedIcon"/>
                        <p>Redux</p>
                    </div>

                    <div className="techSection">
                        <img src={Express} alt="Express" className="techUsedIcon"/>
                        <p>Express</p>
                    </div>

                    <div className="techSection">
                        <img src={PostgreSQL} alt="PostgreSQL" className="techUsedIcon"/>
                        <p>PostgreSQL</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default About;
