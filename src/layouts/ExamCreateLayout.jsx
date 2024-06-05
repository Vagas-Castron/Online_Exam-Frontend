import React, { createContext, useContext, useState } from 'react';
import { redirect, Form, useNavigate, Link } from 'react-router-dom';
import ExamCreatePage from '../components/exam-pages/ExamCreatePage';
import ExamPreviewPage from '../components/exam-pages/ExamPreviewPage';
import Header from "../components/Header"
import { isAdminAuthenticated, isAuthenticated, localhost, retrieveData } from '../utils';
import { MdCancel } from "react-icons/md"
import { IoIosAddCircleOutline } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"
import { TbTrashXFilled } from "react-icons/tb"
import { reformatFormData  } from '../utils';
import ExamQuestion from '../components/exam-pages/QuestionsForm';

export async function action({ request }) {
    const formData = await request.formData()
    const data = reformatFormData(formData)
    console.log(data)

    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }


    try {
        const response = await fetch(`http://${localhost}:8000/api/exam/compose`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        return redirect("/exam-creation")
    }catch(error){
        throw {message: "error"}
    }
    return null
}

export async function loader(){
    if(isAuthenticated()){
        return null
    }else {
        return redirect("/")
    }
}


// function ExamOption({ questionId, optionId, removeOption }) {
//     function optionLetter(optionId){
//         const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//         return letters[optionId]
//     }


//     function handleClick(event){
//         event.preventDefault()
//         removeOption(optionId)
//     }


//     return (
//         <li>
//             <input 
//                 type="checkbox"
//                 name={`selector-${questionId}${optionLetter(optionId - 1)}`} 
//             />
//             <input
//                 type="text"
//                 id="text-input"
//                 name={`option-${questionId}${optionLetter(optionId - 1)}`}
//                 placeholder={`Option ${optionId}`}
//             />
//             <div
//                 className='option-rem'
//                 onClick={e => handleClick(e)}
//             >
//                 <MdOutlineCancel size="1.5em"/>
//             </div>
//         </li>
//     );
// }

// function ExamQuestion({ questionId, removeQuestion}) {
//     const [optionCount, setOptionCount] = React.useState(1);
//     const [options, setOptions] = React.useState([{id: 1}]);
//     const [point, setPoint] = React.useState(1)

//     React.useEffect(() => {
//         const pointInput = document.querySelector("#point-input")
//         function inputConditioning(e){
//             if(e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 40 || e.keyCode === 13){
//                 e.preventDefault()
//                 return false
//             }
//         }

//         if(pointInput){
//             pointInput.addEventListener( 'keydown', inputConditioning)
//         }

//         return () => {
//             if(pointInput){
//                 pointInput.removeEventListener("keydown", inputConditioning)
//             }
//         }
//     }, [])

//     function handleClick(event) {
//         event.preventDefault()
//         const targetDiv = event.target.closest("div[data-name]")
//         const name = targetDiv? targetDiv.getAttribute('data-name'): null
//         console.log(name)
//         if(name === "question-del"){
//             removeQuestion(questionId)
//         }else{
//             setOptionCount(prevCount => prevCount + 1)
//             setOptions(prevOptions => {
//                 const optionId = prevOptions.length + 1
//                 return [
//                     ...prevOptions,
//                     {id: optionId},
//                 ]
//             });
//         }
//     }

//     function removeOption(optionId){
//         setOptions(prevOptions => {
//             // console.log("deleting...", optionId)
//             if(prevOptions.length > 0){
//                 const newOptions = prevOptions.filter(option => option.id !== optionId - 1)
//                 // setOptionCount(prevCount => prevCount - 1)
//                 const sortedOptions = newOptions.map((option, index) => {
//                     return {id: index + 1}
//                 })
//                 console.log(newOptions)
//                 return sortedOptions
//             }else{
//                 return prevOptions
//             }
//         })
//     }

//     return (
//         <div className='question-container'>
//             <div className="point-container">
//                 <span></span>
//             </div>    
//             <div className='question'>
//                 <textarea
//                     name={`question-${questionId}`}
//                     rows={1}
//                     placeholder="Enter Question"
//                 />
//                 <input
//                         type='number'
//                         name={`point-${questionId}`}
//                         id="point-input"
//                         min={1}
//                         max={10}
//                         placeholder='Point'
//                     />
//                 <div
//                     data-name="question-del"
//                     className='action-btn cancel-btn qn-rem'
//                     onClick={e => handleClick(e)}
//                 >
//                     <TbTrashXFilled size="1.5em" name="trash"/>
//                 </div>
//             </div>
//             <ul>
//                 {options.map(
//                     option => <ExamOption 
//                                     key={option.id} 
//                                     questionId={questionId} 
//                                     optionId={option.id} 
//                                     removeOption={() => removeOption(option.id)}
//                                 />
//                             )
//                 }
//             </ul>
//             <div className='option-add' onClick={handleClick}>Add option</div>
//         </div>
//     );
// }




function ExamCreateLayout({ formTrigger}) {
    const [questionCount, setQuestionCount] = React.useState(1)
    const [totalScore, setTotalScore] = React.useState(0)
    const [questions, setQuestions] = React.useState([{id: 1}])
    const navigate = useNavigate()

    function handleClick(event){
        event.preventDefault()
        const { name } = event.target.closest("button")
        console.log(event.target.closest("button"))
        if(name === "add"){
            setQuestionCount(count => count + 1)
            setQuestions(prevQuestions => {
                const questionId = prevQuestions.length + 1
                return [
                    ...prevQuestions,
                    {id: questionId},
                    ]
            })
        }
        else{
            navigate("/exam-creation")
        }
    }

    function removeQuestion(questionId){
        setQuestions(prevQuestions => {
            if(prevQuestions.length > 0){
                console.log("deleting...", questionId)
                const newQuestions = prevQuestions.filter(question => {
                    console.log(question.id, questionId)
                    return question.id !== questionId - 1
                })
                // setQuestionCount(count => count - 1)
                const sortedQuestions = newQuestions.map((question, index) => {
                    return {id: index + 1}
                })
                console.log(sortedQuestions)
                return sortedQuestions
            }else{
                return prevQuestions
            }
        })
    }

    return (
        <>
                    <Form method='post'>
                        <div className='header-fm '>
                            <h2>New Exam</h2>
                            <Link to="/exam-creation" className='nopad-btn btn-link-circle'>
                                <MdCancel size="1.5em"/>
                            </Link>
                        </div>
                        <div className='form-content'>
                            <div className="question-container">
                                <ul>
                                    <li>

                                        <input 
                                            type='text'
                                            name='title'
                                            placeholder="Untitled"
                                        />
                                        <div>
                                            <span>Timer: </span>
                                            <input 
                                                name='timer'
                                                type="number"
                                                placeholder='Duration in Minutes'
                                            />
                                        </div>
                                    </li>
                                </ul>
                                <textarea 
                                    name="description" 
                                    rows={1}
                                    placeholder='Description'
                                />
                            </div>
                            {questions.map( 
                                question => <ExamQuestion 
                                                key={question.id} 
                                                questionId={question.id}
                                                removeQuestion={() => removeQuestion(question.id)}/>
                                )
                            }
                            <div>
                            </div>
                            <div className='btn-container lim-width'>
                                <button 
                                    name="add" 
                                    className="action-btn"
                                    onClick={e => handleClick(e)}
                                >
                                    <IoIosAddCircleOutline size="1.5em"/>
                                </button>
                                <button>submit</button>
                            </div>
                        </div>
                    </Form>
        </>
    )
}

export default ExamCreateLayout