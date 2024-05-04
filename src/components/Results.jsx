import React from "react"
import { redirect, useLocation, useNavigate } from "react-router-dom"
import StatisticsComponent from "./StatisticsComponent"
import Information from "./Information"
import arrowup from "../assets/arrow-up-icon1.png"
import arrowdown from "../assets/arrow-down-icon2.png"
import "../svg.css"
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
    const { score, totalScore, exam } = location.state
    const [ clicked, setClicked ] = React.useState()

    const navigate = useNavigate()

    const answers = exam.map((exam, index) => {
        const options = exam.options.map((option, optionIndex) => {
            if (option.truthness) {
                return (<li key={`option-${optionIndex}`}>{option.optionValue}</li>)
            } else {
                return null;
            }
        });
    
        return (
            <>
                {
                    
                }
            <div className="question-section">
                <div className="question-container">
                    <div className="question"><span>{exam.id}.</span><span className="qn-span">{exam.question}</span></div>
                    <ul className="option-container">{options}</ul>
                </div>
                <hr/>
            </div>
            </>
        );
    });

    function logUserOut(){
        clearData()
        navigate("/")
    }
    
    function handleClick(event){
        const { name } = event.target
        if(name === "finish"){
            setConfirmation(prevState => !prevState)
        }else{
            setClicked(prevState => !prevState)
        }
    }

    return(
        <div className="result-container">
            {confirmation? <Information setConfirmation={setConfirmation} action={logUserOut} byPassing={false} process={"log out"}/>: ""}
            <StatisticsComponent score={score} totalScore={totalScore}/>
            <div className="question-compose-form">
                <div>
                    <header 
                        className="header view-answer" 
                        name="show"
                        onClick={(e) => handleClick(e)}
                    >
                        {
                            clicked? 
                                (<div className="show-answer">
                                    <span>Hide Answers</span>
                                    <span className="img-bc"><img src={arrowup} alt="" srcset="" height={20} width={20}/></span>
                                </div>
                                )
                                : 
                                (<div className="show-answer">
                                    <span>Show Answers</span>
                                    <span className="img-bc"><img src={arrowdown} alt="" srcset="" height={20} width={20}/></span>
                                </div>
                                )
                        }
                    </header>
                    {clicked? answers: ""}
                </div>
                <button className="form-button" name="finish" onClick={(e) => handleClick(e)}>Finish</button>
            </div>
        </div>
    )
}

export default Results