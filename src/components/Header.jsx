import React from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveData } from '../utils';
import logo from "../assets/official logo.png"
import userImage from "../assets/user-profile.png"
import arrowImage from "../assets/dropdown-arrow.png"
import exitImage from "../assets/exit.png"
import { clearData } from "../utils";
import { TiThMenu } from "react-icons/ti";
import { LuLogOut } from "react-icons/lu";

function Header() {
    const [userName, setUserName] = React.useState()
    const location = useLocation();
    const navigate = useNavigate()

    React.useEffect(() =>{
            setUserName(`${retrieveData()?.first_name} ${retrieveData()?.last_name}`);

        const btn = document.querySelector("#toggleBtn")
        const subheader = document.querySelector(".logo-subheader")

        function toggle(){
            subheader.classList.toggle("active")
        }
        
        btn.addEventListener("click", toggle)
        return () => btn.removeEventListener("click", toggle)
        
    }, [location])

    function handleClick(){
        clearData()
        navigate("/")
    }


    return (
        <header className="header-container">
            <div className="logo-subheader">
                <img src={logo} alt="company logo" width={75} height={75}/>
                <h2>Utel Global</h2>
            </div>
            <div className="nav-subheader">
                <label className="menu-btn" >
                    <input type="checkbox" className="btn" id="toggleBtn"/>
                </label>
                <div className="nav-container">
                    <nav className="header-nav">
                        <ul>
                            <>
                                <li>
                                    <div className="dropdown">
                                        <div className="dropdown-btn">
                                            <span>
                                                <img src={userImage} alt="user image" width={25} height={25} />
                                            </span>
                                            <span className="username">
                                                {userName}
                                            </span>
                                            <span>
                                                <img src={arrowImage} alt="user image" width={25} height={25} />
                                            </span>
                                        </div>
                                        <ul className="menu-items">
                                            <li onClick={handleClick}>
                                                <LuLogOut size="1.5em"/>
                                                <span>Log out</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li> 
                            </>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header