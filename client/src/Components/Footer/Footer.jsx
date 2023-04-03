import "./Footer.modules.css"
import facebook from "../../Assets/SocialMediaIcons/facebook.png"
import twitter from "../../Assets/SocialMediaIcons/twitter.png"
import instagram from "../../Assets/SocialMediaIcons/instagram.png"
import github from "../../Assets/SocialMediaIcons/github.png"
import linkedin from "../../Assets/SocialMediaIcons/linkedin.png"


const Footer = () => {
    return (
        <>
            <footer>

                <div className="footer-wrapper">

                    <div className="developer-info">
                        <p className="developer">Designed by Rejcob</p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com"><img src={facebook} alt="facebookLogo" className="socialMediaIcon" /></a>
                            <a href="https://twitter.com/Jacobo44819835"><img src={twitter} alt="twitterLogo" className="socialMediaIcon" /></a>
                            <a href="https://www.instagram.com/rejcob/"><img src={instagram} alt="instagramLogo" className="socialMediaIcon" /></a>
                            <a href="https://github.com/Jcooob"><img src={github} alt="githubLogo" className="socialMediaIcon" /></a>
                            <a href="https://www.linkedin.com/in/jacobo-cohello-096102251/"><img src={linkedin} alt="linkedin" className="socialMediaIcon" /></a>
                        </div>
                    </div>

                    <div className="about-link">
                        <a href="/about">About</a>
                    </div>

                </div>

            </footer>
        </>
    )
}

export default Footer;