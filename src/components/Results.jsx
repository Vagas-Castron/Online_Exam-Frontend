import React from "react"
import { redirect, useLocation, useNavigate } from "react-router-dom"
import StatisticsComponent from "./StatisticsComponent"
import Information from "./Information"
import arrowup from "../assets/arrow-up-icon1.png"
import arrowdown from "../assets/arrow-down-icon2.png"
import "../svg.css"
import { FaArrowCircleDown } from "react-icons/fa"
import { FaArrowCircleUp } from "react-icons/fa"
import { isAuthenticated, clearData } from "../utils"

export async function loader() {
    if(isAuthenticated()){
        return null
    }else{
        return redirect("/")
    }
}

function Results() {
    const [confirmation, setConfirmation] = React.useState(false)
    const location = useLocation()
    // const { score, totalScore, exam } = location?.state
    const [ clicked, setClicked ] = React.useState()

    const navigate = useNavigate()

    function logUserOut(){
        clearData()
        navigate("/")
    }
    
    function handleClick(event){
        // const { name } = event.target
        // if(name === "finish"){
        //     setConfirmation(prevState => !prevState)
        // // }else{
            setClicked(prevState => !prevState)
        // }
    }

    return(
        <form>
            <StatisticsComponent/>
            <header 
                className="header-fm" 
                name="show"
                
            >
                <div className="horizontal-spread">
                    <h3>Answers</h3>
                    {
                        clicked? 
                            <button 
                                className='add-btn btn-link-circle' 
                                onClick={(e) => handleClick(e)}
                            >
                                <FaArrowCircleUp size="1.5em"/>
                            </button>
                            :
                            <button 
                                className='add-btn btn-link-circle' 
                                onClick={(e) => handleClick(e)}
                            >
                                <FaArrowCircleDown size="1.5em"/>
                            </button>
                    }
                </div>
                        
            </header>
            <div className="form-content">
                {
                    clicked && <div className="question-container">
                                    { answers }
                                </div>
                }
                {/* <button className="form-button" name="finish" onClick={(e) => handleClick(e)}>Finish</button> */}
            </div>
        </form>
    )
}

export default Results