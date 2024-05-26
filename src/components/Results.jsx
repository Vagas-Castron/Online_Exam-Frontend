import React from "react"
import { redirect, useLocation, useNavigate, useLoaderData } from "react-router-dom"
import StatisticsComponent from "./StatisticsComponent"
import Information from "./Information"
import arrowup from "../assets/arrow-up-icon1.png"
import arrowdown from "../assets/arrow-down-icon2.png"
import "../svg.css"
import { FaArrowCircleDown } from "react-icons/fa"
import { FaArrowCircleUp } from "react-icons/fa"
import { isAuthenticated, clearData, retrieveData } from "../utils"

export async function loader() {
    
    if(isAuthenticated()){
        const token = retrieveData()?.token
        const userId = retrieveData().username.slice(-4)

        const headers = {
            'Authorization': `Token ${token}`,
            // 'Content-Type': 'application/json'
        }
        const response = await fetch(`http://localhost:8000/api/exam/result/${userId}`,
        {
                method: 'GET',
                headers: headers,
                // body: JSON.stringify({username: username})
            }
        )
        const data = await response.json()
        return data
    }else{
        return redirect("/")
    }
}

function Results() {
    const data = useLoaderData()
    console.log(data)
    const [confirmation, setConfirmation] = React.useState(false)
    const location = useLocation()
    // const { score, totalScore, exam } = location?.state
    const [ clicked, setClicked ] = React.useState()


    const timestamp = "2024-05-26T06:37:15.685584Z";
    const date = new Date(data.submitted);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false
    });
    console.log(formattedDate);  // Example output: "05/26/2024, 06:37:15"

    
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
            <div className="header-fm">
                <h1>Results</h1> 
                <div>
                    <span>
                        Submitted: 
                    </span>
                    <span> {formattedDate}</span>
                </div>
            </div>
            <StatisticsComponent score={data.score} totalScore={data.total_score}/>
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