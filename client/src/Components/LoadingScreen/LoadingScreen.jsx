import "./LoadingScreen.modules.css"
import loadingGif from "../../Assets/loadingGif.gif"

const LoadingScreen = () => {
    return (
        <>
            <div className="bodyLoading">
                <h1 className="loadingText">Loading</h1>
                <img className="loadingGif" src={loadingGif} alt="Loading..." />
            </div>
        </>
    )
}

export default LoadingScreen;