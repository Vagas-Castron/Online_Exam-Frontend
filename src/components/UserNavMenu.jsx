import React from "react"
import { NavLink } from "react-router-dom"

function UserNavMenu() {
    return (
        <div className="user-nav-container">
            <h3>Navigation</h3>
            <ul>
                <NavLink><li>Instructions</li></NavLink>
                <NavLink><li>Questions</li></NavLink>
                <NavLink><li>Results</li></NavLink>
            </ul>
        </div>
    )
}

export default UserNavMenu