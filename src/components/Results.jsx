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
        try{
            const response = await fetch(`http://localhost:8000/api/exam/result/${userId}`,
            {
                    method: 'GET',
                    headers: headers,
                    // body: JSON.stringify({username: username})
                }
            )
            const data = await response.json()
            if(response.status !== 200){
                throw {
                    message: data.message,
                }
            }
            return data
        }catch(error){
            console.log(error.message)
            return error
        }
    }else{
        return redirect("/")
    }
}


function ExamOption({ option, questionId, optionId, removeOption }) {
    function optionLetter(optionId){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return letters[optionId]
    }
    // console.log(questionId, optionId)

    function handleChange(event){
        const { name } = event.target
        console.log(name)
    }

    function handleClick(event){
        event.preventDefault()
        removeOption(optionId)
    }


    return (
        <li>
            <input 
                type="checkbox"
                name={`selector-${questionId}${optionLetter(optionId - 1)}`}
                checked={option? option.correct: false}
                
            />
            <input
                type="text"
                name={`option-${questionId}${optionLetter(optionId - 1)}`}
                placeholder={`Option ${optionId}`}
                value={option? option.text: ""} 
                readOnly={true}
            />
            {   
                !option &&   <div
                                className='option-rem'
                                onClick={e => handleClick(e)}
                            >
                                <MdOutlineCancel size="1.5em"/>
                            </div>
            }
        </li>
    );
}

function ExamQuestion({ question, questionId, removeQuestion }) {
    const [optionCount, setOptionCount] = React.useState(0);
    const [options, setOptions] = React.useState([{id: 1}]);

    function handleClick(event) {
        event.preventDefault()
        const targetDiv = event.target.closest("div[data-name]")
        const name = targetDiv? targetDiv.getAttribute('data-name'): null
        console.log(name)
        if(name === "question-del"){
            removeQuestion(questionId)
        }else{
            setOptionCount(prevCount => prevCount + 1)
            setOptions(prevOptions => {
                const optionId = options.length + 1
                return [
                    ...prevOptions,
                    {id: optionId},
                ]
            });
        }
    }

    function removeOption(optionId){
        setOptions(prevOptions => {
            // console.log("deleting...", optionId)
            if(prevOptions.length > 0){
                const newOptions = prevOptions.filter(option => option.id !== optionId - 1)
                // setOptionCount(prevCount => prevCount - 1)
                const sortedOptions = newOptions.map((option, index) => {
                    return {id: index + 1}
                })
                console.log(sortedOptions)
                return sortedOptions
            }else{
                return prevOptions
            }
        })
    }

    return (
        <div className='question-container'>
            <div className='question'>
                <textarea
                    name={`question-${questionId}`}
                    value={question? question.text: ""}
                    readOnly={true}
                    rows={1}
                />
                <span>{question.point} Points</span>
                {   !question && <div
                                    data-name="question-del"
                                    className='action-btn nopad-btn qn-rem'
                                    onClick={e => handleClick(e)}
                                >
                                    <TbTrashXFilled size="1.5em" name="trash"/>
                                </div>}
            </div>
            <ul>
                {question.options.map(
                    (option, index) => <ExamOption 
                                    key={index} 
                                    questionId={questionId} 
                                    optionId={index + 1} 
                                    // removeOption={() => removeOption(option.id)}
                                    option={option}
                                />
                            )
                }
            </ul>
            { !question && <div className='option-add' onClick={handleClick}>Add option</div>}
        </div>
    );
}



function Results() {
    const data = useLoaderData()
    console.log(data)
    const [confirmation, setConfirmation] = React.useState(true)
    const location = useLocation()
    // const { score, totalScore, exam } = location?.state
    const [ clicked, setClicked ] = React.useState(true)

    // console.log(data.submitted)
    const error = data?.message || null

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
        event.preventDefault()
        setClicked(prevState => !prevState)
    }

    return(
        
            error === null ?
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
            <div className="form-content user-side greencheck">
                {
                    clicked &&  <ul>
                                    {data?.questions.map(
                                        (question, index) => <ExamQuestion 
                                                                key={index} 
                                                                questionId={index + 1} 
                                                                // optionId={option.id} 
                                                                // removeOption={() => removeOption(option.id)}
                                                                question={question}
                                                            />
                                                )
                                    }
                                </ul>
                }
                {/* <button className="form-button" name="finish" onClick={(e) => handleClick(e)}>Finish</button> */}
            </div>
        </form>
        :
        <h2>{error}</h2>
   
    )
}

export default Results