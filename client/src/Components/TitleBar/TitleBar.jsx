import { Link } from "react-router-dom";
import logo from "../../Assets/doggoApiLogoBlack.png";
import "./TitleBar.modules.css";

const TitleBar = ({ type, text }) => {
  const backButtonLink = type === "createBreed" || type === "deleteBreed" ? "/manageBreeds" : "/Dogs";

  return (
    <div className="bar">
      <Link to={"/"}>
        <img src={logo} alt="Doggo Api Logo" className="logo" />
      </Link>

      {type === "landing" ? (
        <h1 className="titleLanding">Welcome to DoggoApi</h1>
      ) : (
        <h1 className="title">{type === "form" ? "Create your own breed!" : text}</h1>
      )}
      {type !== "landing" && (
        <Link to={backButtonLink}>
          <button className="backButton">back</button>
        </Link>
      )}
    </div>
  );
};

export default TitleBar;
