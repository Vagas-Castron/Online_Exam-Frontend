import React from "react"
import { Form, useLoaderData, useParams } from "react-router-dom"
import { retrieveData } from "../utils"
import ExamQuestion from "./exam-pages/QuestionsForm"


export async function examfetcher(examId){
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(`http://localhost:8000/api/exam/${examId}`,
       {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json()
    return data
}

export default function ExamEditContainer(){
    const { id } = useParams()
    const [data, setData] = React.useState()
    console.log(data)
    console.log(id)
    React.useEffect(() => {
        const examData = examfetcher(id)
        console.log(examData)
    },[])
    return (
        <>
            <Form method="post" onSubmit={ e => handleSubmit(e)}>
                <div className="form-content user-side">
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
                                    <span>{examData.timer} Min</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        {examData?.questions.map(
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
        // <h2>Exam editing page</h2>
    )
}