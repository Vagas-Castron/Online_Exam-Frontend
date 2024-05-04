import React, { createContext, useContext, useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import ExamCreatePage from '../components/exam-pages/ExamCreatePage';
import ExamPreviewPage from '../components/exam-pages/ExamPreviewPage';
import Header from "../components/Header"
import { isAdminAuthenticated } from '../utils';


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


function ExamCreateLayout() {
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
                if (question.id !== newData.id) {
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
            <Header />
            <main className='content-container'>

                    <ExamPreviewPage data={data} updateData={updateData}/>
                    <ExamCreatePage data={data} updateData={updateData}/>
            </main>
        </>
    )
}

export default ExamCreateLayout