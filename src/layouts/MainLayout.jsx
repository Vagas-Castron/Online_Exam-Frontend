import React from "react"
import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"


function MainLayout() {
    const user = false;
    return (
        <>  
            {/* <main className="content-container"> */}
                <Outlet />
            {/* </main> */}
            <Footer />
        </>
    )
}

export default MainLayout