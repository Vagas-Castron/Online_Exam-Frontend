import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { MdSpaceDashboard} from "react-icons/md"
import { IoCreate } from "react-icons/io5"
import { SiMicrosoftacademic } from "react-icons/si"
import { FaUser } from "react-icons/fa"
import { BsFillFileBarGraphFill } from "react-icons/bs"
import { BsFileEarmarkBarGraphFill } from "react-icons/bs"
import { TiThMenu } from "react-icons/ti";
import { retrieveData } from "../utils"
import userImage from "../assets/user-profile.png"
import logo from "../assets/official logo.png"


export default function Sidebar() {
    const status = retrieveData().status
    const username = retrieveData().username.split("/")
    const user = username[3].toUpperCase()
    console.log(status)
    return (
        <div className="sidebar-menu">
            {/* <div className="logo-container">
                <img src={logo} alt="company logo" width={100} height={100}/>
                <label className="menu-btn" >
                    <input type="checkbox" className="btn" id="toggleBtn"/>
                </label>
            </div> */}
            {/* <div className="top">
                <span className="description">Menu</span>
                <label className="menu-btn" >
                    <input type="checkbox" className="btn" id="toggleBtn"/>
                </label>
            </div> */}
            <div className="hero">
                <img src={userImage} alt="" width={50} height={50} />
                <div className="user-info">
                    <span>{user}</span>
                    <br/>
                    <span>{status=== "administrator"? "Admin": status}</span>
                </div>
            </div>
            <ul>
                <li>
                    <NavLink 
                        to="dashboard"
                        className={({isActive}) => {
                            return isActive? "active-link": ""
                        }}
                    >   
                        <MdSpaceDashboard size="25px" className="icon"/>
                        <span className="item-name">Dashboard</span>
                    </NavLink>
                    <span className="tooltip">Dashboard</span>
                </li>
                <li>
                    <NavLink 
                        to="exam"
                        className={({isActive}) => {
                            return isActive? "active-link": ""
                        }}
                    >
                        <SiMicrosoftacademic size="25px" className="icon"/>
                        <span className="item-name">Exam</span>
                    </NavLink>
                    <span className="tooltip">Exam</span>
                </li>
                {
                    status !== "agent" 
                    && 
                    <li>
                        <NavLink 
                                to="exam-creation" 
                                className={({isActive}) => {
                                    return isActive? "active-link": ""
                                }}
                        >
                            <IoCreate size="25px" className="icon"/>
                            <span className="item-name">Compose</span>
                        </NavLink>
                        <span className="tooltip">Compose</span>
                    </li>
                }
                <li>
                    <NavLink 
                        to="Results"
                        className={({isActive}) => {
                            return isActive? "active-link": ""
                        }}
                    >
                        <BsFileEarmarkBarGraphFill size="25px" className="icon"/>
                        <span className="item-name">Results</span>
                    </NavLink>
                    <span className="tooltip">Results</span>
                </li>
                { 
                    status === "administrator"
                    &&   
                    <li>
                        <NavLink 
                            to="user-management"
                            className={({isActive}) => {
                                return isActive? "active-link": ""
                            }}
                        >
                            <FaUser size="25px" className="icon"/>
                            <span className="item-name">Users</span>
                        </NavLink>
                        <span className="tooltip">Users</span>
                    </li>
                }
            </ul>
        </div>
    )
}