import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"


export default function ContentLayout(){
    return (
        <>
            <div className="sidebar-container">
                <Header />
                <div className="sidebar"></div>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </>
        
    )
}