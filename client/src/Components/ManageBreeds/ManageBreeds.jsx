import { Link } from "react-router-dom";
import TitleBar from "../TitleBar/TitleBar";
import bin from "../../Assets/bin.png"
import add from "../../Assets/add.png"
import Footer from "../Footer/Footer";
import "./ManageBreeds.modules.css"

const ManageBreeds = () => {
    return (
        <>
            <TitleBar type ={"detail"} text={"Manage breeds"} />

            <div className="manageBody">

                <Link to ={"/createBreed"}>
                    <div className="createBreed">
                        <h1>Create breed</h1>
                        <img src={add} className="createIcon"/>
                    
                    </div>
                </Link>

                <Link to ={"/deleteBreed"}>
                    <div className="deleteBreed">
                        <h1>Delete breed</h1>
                        <img src={bin} className="deleteIcon"/>
                    </div>
                </Link>

            </div>

            <Footer />
        </>
    )
}

export default ManageBreeds;