import React, { createContext, useContext, useState } from 'react';
import { useLoaderData, redirect, Form } from 'react-router-dom';
import ExamCreatePage from '../components/exam-pages/ExamCreatePage';
import ExamPreviewPage from '../components/exam-pages/ExamPreviewPage';
import Header from "../components/Header"
import { isAdminAuthenticated } from '../utils';
import { TiArrowBack } from "react-icons/ti"


export async function loader() {
    const isAdmin = isAdminAuthenticated();
    if (isAdmin) {
         redirect("/exam-creation")
         return null
    } else {
         redirect("/")
         return null
    }
}

function ExamOption(){
    return(
        <input
            type='text'
            name='option'
            placeholder='Option'
        />
    )
}

function ExamQuestion(){
    const [optionCount, setOptionCount] = React.useState(1)
    const [option, setOption] = React.useState([])
    React.useEffect(() =>{
        for( let i = 0; i < optionCount; i++){
            setOption(prevOptions => [
                ...prevOptions,
                <ExamOption />
            ])
        }

    }, [optionCount])

    function handleClick(){
        setOption(prevCount => prevCount + 1)
    }

    return (
        <>
            <textarea
                name='question'
                placeholder='Enter Question'
            />
            {option.map(option => option)}
            <hr />
            <button onClick={handleClick}>add option</button>
        </>
    )
}


function ExamCreateLayout({ formTrigger}) {
    const [questionCount, setQuestionCount] = React.useState(3)
    const [questions, setQuestions] = React.useState([])
    React.useEffect(() => {
        for( let i = 0; i < questionCount; i++){
            setQuestions(prevQuestions => [
                ...prevQuestions,
                <ExamQuestion />
            ])
        }
    },[questionCount])

    function handleClick(){
        formTrigger(false)
    }

    const [data, setData] = React.useState([])
    function updateData(newData){
        setData(prevData => {
            if(prevData.includes(newData)){
                const letters = "abcdefghijklmnopqrstuvwxyz"
                const updatedQuestions = prevData.filter(data => data !== newData)
                // Update the IDs of the remaining questions
            const updatedQuestionsWithIDs = updatedQuestions.map((data, index) => ({
                ...data,
                id: index + 1
            }));

            // Update the options of the remaining questions
            const updatedQuestionsWithOptions = updatedQuestionsWithIDs.map((question, index) => {
                // If the question's ID is greater than the deleted question's ID,
                // decrement the ID of each option
                if (question.id >= newData.id) {
                    const updatedOptions = question.options.map(option => ({
                        ...option,
                        optionId: `${question.id - 1}${letters[index].toLocaleUpperCase()}` // Decrement optionId
                    }));
                    return { ...question, options: updatedOptions };
                }
                console.log(question)
                return question;
            });

            return updatedQuestionsWithOptions;
        } else {
            // Add the new question
            const updatedData = [...prevData, newData];

            // Update the IDs of all questions
            return updatedData.map((data, index) => ({ ...data, id: index + 1 }));
        }
        })
    }

    return (
        <>
            <main className='questions-container'>
                {/* <div className="questions-form">
                    <ExamPreviewPage data={data} updateData={updateData}/>
                    <ExamCreatePage data={data} updateData={updateData}/>
                </div> */}
                <Form method='post'>
                    {questions.map(question => question)}
                </Form>
                <div className='btn-container'>
                        <button>submit</button>
                        <button className='round-btn' onClick={handleClick}>
                            <TiArrowBack size="1.5em"/>
                        </button>
                    </div>
            </main>
        </>
    )
}

export default ExamCreateLayout