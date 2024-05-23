import React, {createContext} from "react"
import { useLoaderData, useNavigate, redirect, Form } from "react-router-dom"
import Information from "../Information"
import examination from "../../assets/examination.json"
import Timer from "../Timer"
import Header from "../Header"
import Question from "../Question"
import { examSubmit, isAuthenticated, reformatFormData } from "../../utils"
import { retrieveData } from '../../utils'
import { MdOutlineCancel } from "react-icons/md"
import { TbTrashXFilled } from "react-icons/tb"

function deepComparison( obj1, obj2){
    console.log(obj1, obj2)
    let result = []
    if( obj1 === obj2)
        return true
    if(typeof obj1 === "object" && obj1 !== null && typeof obj2 === "object" && obj2 !== null){
        const keys1 = Object.keys(obj1)
        const keys2 = Object.keys(obj2)

        for( let key of keys1 ){
            if( !keys2.includes(key) || !deepComparison(obj1[key], obj2[key])){
                result.push(false)
            }
            result.push(true)
        }
        return result
    }
    result.push(false)
    console.log(result)
    return result
}

function compare(option1, option2){
    
    console.log(option1)
    if( option1 === option2)
        return true;
    if( !Array.isArray(option1) || !Array.isArray(option2))
        return false
    if(option1.length !== option2.length)
        return false
    for(let i = 0; i < option1.length; i++){
        // console.log(option1.length)
        
        if( !deepComparison(option1[i], option2[i]).includes(false) ){
            return true
        }
    }
    return false
}






export async function loader() {
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        // 'Content-Type': 'application/json'
    }
    const response = await fetch('http://localhost:8000/api/exam/23',
       {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json()
    return data
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

function ExamPage(){
    const [ score, setScore ] = React.useState(0)
    const examData = useLoaderData()

    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const submittedData = reformatFormData(formData)
        for(let i = 0; i < examData.questions.length; i++){
            // console.log(submittedData.questions[i].options)
            if(compare(examData.questions[i].options, submittedData.questions[i].options)){
                setScore(prevScore => prevScore + 1)
            }
        }
        console.log(examData.questions)

        console.log(score)
        
    }

    return(
        <>
            <Form method="post" onSubmit={ e => handleSubmit(e)}>
                <div className="form-content">
                <div className="question-container">
                    <ul>
                        <li>
                            <input 
                                type='text'
                                name='title'
                                value={examData.title}
                                readOnly={true}
                            />
                            <div>
                                <span>Timer: </span>
                                <span>15 Min</span>
                            </div>
                        </li>
                    </ul>
                </div>
                    <ul>
                        {examData.questions.map(
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
                    <div className='btn-container'>
                        <span></span>
                        <button>submit</button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default ExamPage