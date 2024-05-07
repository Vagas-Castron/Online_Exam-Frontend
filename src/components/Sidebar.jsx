import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { MdSpaceDashboard} from "react-icons/md"
import { IoCreate } from "react-icons/io5"
import { SiMicrosoftacademic } from "react-icons/si"
import { FaUser } from "react-icons/fa"
import { BsFillFileBarGraphFill } from "react-icons/bs"
import { BsFileEarmarkBarGraphFill } from "react-icons/bs"


export default function Sidebar() {

    return (
        <div className="sidebar-menu">
            <div className="top">
                <span className="description">Menu</span>
                <button className="menu-btn" id="toggleBtn"></button>
            </div>
            <ul>
                <li>
                    <NavLink to="dashboard">
                        <MdSpaceDashboard size="25px" className="icon"/>
                        <span className="menu-item-name">Dashboard</span>
                    </NavLink>
                    <span className="tooltip">Dashboard</span>
                </li>
                <li>
                    <NavLink to="exam">
                        <SiMicrosoftacademic size="25px" className="icon"/>
                        <span className="menu-item-name">Exam</span>
                    </NavLink>
                    <span className="tooltip">Exam</span>
                </li>
                <li>
                    <NavLink to="exam-create">
                        <IoCreate size="25px" className="icon"/>
                        <span className="menu-item-name">Compose</span>
                    </NavLink>
                    <span className="tooltip">Compose</span>
                </li>
                <li>
                    <NavLink to="Results">
                        <BsFileEarmarkBarGraphFill size="25px" className="icon"/>
                        <span className="menu-item-name">Results</span>
                    </NavLink>
                    <span className="tooltip">Results</span>
                </li>
                <li>
                    <NavLink to="user-management">
                        <FaUser size="25px" className="icon"/>
                        <span className="menu-item-name">Users</span>
                    </NavLink>
                    <span className="tooltip">Users</span>
                </li>
            </ul>
        </div>
    )
}