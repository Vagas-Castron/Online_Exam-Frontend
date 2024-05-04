import React from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveData } from '../utils';
import logo from "../assets/official logo.png"
import userImage from "../assets/user-profile.png"
import arrowImage from "../assets/dropdown-arrow.png"
import exitImage from "../assets/exit.png"
import { clearData } from "../utils";

function Header() {
    const [username, setUsername] = React.useState()
    const location = useLocation();
    const navigate = useNavigate()

    React.useEffect(() =>{
        console.log(location)
            setUsername(retrieveData()?.username);
        
    }, [location])

    function handleClick(){
        clearData()
        navigate("/")
    }


    return (
        <header className="header-container">
            <div className="logo-container"><img src={logo} alt="company logo" width={50} height={50}/></div>
            <div className="nav-container">
                <nav className="header-nav">
                    <ul>
                        <>
                            <li>
                                <div className="dropdown">
                                    <button className="dropdown-btn">
                                        <span>
                                            <img src={userImage} alt="user image" width={25} height={25} />
                                        </span>
                                        <span>
                                            {username}
                                        </span>
                                        <span>
                                            <img src={arrowImage} alt="user image" width={25} height={25} />
                                        </span>
                                    </button>
                                    <ul className="menu-items">
                                        <li onClick={handleClick}>Log out</li>
                                    </ul>
                                </div>
                            </li> 
                        </>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header