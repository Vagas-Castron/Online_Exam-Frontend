import React from "react"
import { useLoaderData, Link, Form } from "react-router-dom"
import { timestampFormatting } from "./AgentResult"


export default function AllResult({ data }){
    // const data = useLoaderData()

    function handleClick(){
        setFormTrigger(true)
    }

    return (
        <>
            {/* {formTrigger? <ExamCreateLayout formTrigger={setFormTrigger}/>: ""} */}
            <div>
                <Form method="post" className="filter">
                    <fieldset>

                        <legend>Filter By</legend>

                            <div>
                                <label>
                                    User: 
                                </label>
                                <input 
                                    type="text"
                                    name="username"
                                    placeholder="Username" 
                                />
                            </div>
                            <div>
                                <label>
                                    Date: 
                                </label>
                                <input 
                                    type="date"
                                    name="date_filter" 
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label>
                                    Score: 
                                </label>
                                <input 
                                    type="number"
                                    name="score" 
                                    placeholder="Score"
                                />
                            </div>
                    </fieldset>
                        
                
                </Form>
                <table className='listing-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Exam</th>
                            <th>Score</th>
                            <th>Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr>
                                <td>
                                    <Link to="" className='row-link'>
                                        {d.user}
                                    </Link>
                                </td>
                                <td>{d.exam}</td>
                                <td>{d.score}</td>
                                <td>{timestampFormatting(d.submitted)}</td>
                            </tr>                   
                        ))}
                    </tbody>
                    {/* <Link to="new-exam" className='action-btn pos-right btn-link'>
                        <MdNoteAdd size="1.5em"/>
                        <span>Add User</span>
                    </Link> */}
                </table>
            </div>
        </>
    )
}
