import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"


export default function ContentLayout(){

    useEffect(() => {
        const btn = document.querySelector("#toggleBtn")
        const sidebar = document.querySelector(".sidebar")

        function toggle(){
            sidebar.classList.toggle("active")
        }
        
        btn.addEventListener("click", toggle)
        return () => btn.removeEventListener("click", toggle)
    }, [])

    return (
        <>
            <div className="sidebar-container">
                <Header />
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </>
        
    )
}