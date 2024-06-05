import React from 'react'
import { useLoaderData, Link, redirect } from 'react-router-dom'
import { isAuthenticated, localhost, retrieveData } from '../utils'
import { MdNoteAdd } from "react-icons/md"
import ExamCreateLayout from '../layouts/ExamCreateLayout'

export async function loader(){
    if(isAuthenticated()){
        const token = retrieveData()?.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        const response = await fetch(`http://${localhost}:8000/api/exam/all`,
           {
                method: 'GET',
                headers: headers
            }
        )
        const data = await response.json()
        return data
    }else {
        return redirect("/")
    }
}

export default function AllExamcontainer(){
    const [formTrigger, setFormTrigger] = React.useState(false)
    const data = useLoaderData()
    const list = data.map((d)=> (<div>{d.create}</div>))

    function handleClick(){
        setFormTrigger(true)
    }

    return (
        <>
            {/* {formTrigger? <ExamCreateLayout formTrigger={setFormTrigger}/>: ""} */}
            <div>
                <table className='listing-table'>
                    <thead>
                        <tr>
                            <th>Exam Title</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr>
                                <td>
                                    <Link to="" className='row-link'>
                                        {d.exam_title}
                                    </Link>
                                </td>
                                <td>{d.created}</td>
                            </tr>                   
                        ))}
                    </tbody>
                    <Link to="new-exam" className='action-btn pos-right btn-link'>
                        <MdNoteAdd size="1.5em"/>
                        {/* <span>Add User</span> */}
                    </Link>
                </table>
            </div>
        </>
    )
}

// {`edit-exam/${d.exam_id}`}