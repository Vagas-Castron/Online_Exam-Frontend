import React from "react"
import { useLoaderData, Link, Form } from "react-router-dom"
import { timestampFormatting } from "./AgentResult"
import { localhost, retrieveData } from "../utils"


export default function AllResult({ resultData }){
    const [ data, setData] = React.useState(resultData)
    const [formData, setFormData] = React.useState({
        filter_type: "user__username",
        filter: ""
    })
    // const data = useLoaderData()

    React.useEffect(() => {
        const token = retrieveData()?.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        console.log(formData)
        
        fetch(`http://${localhost}:8000/api/exam/all_result`,
           {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData)
            },
        )
        .then(response => response.json())
        .then(data => setData(data))

    }, [formData])

    function handleChange(event){
        const { name, value } = event.target
        console.log(name)
        setFormData(
            prevData => {
                return {
                    ...prevData,
                    [name]: value
                }
            }
        )


    }

    return (
        <>
            {/* {formTrigger? <ExamCreateLayout formTrigger={setFormTrigger}/>: ""} */}
            <div>
            <form method="post" className="filter">
                    {/* <fieldset> */}

                        <lable for="filter">Filter By</lable>
                                <select name="filter_type"  onChange={e => handleChange(e)}>
                                    <option value="user__username">Username</option>
                                    <option value="exam__exam_id" selected={true}>Exam</option>
                                    <option value="score">Score</option>
                                    <option value="submitted">Submitted</option>
                                </select>
                               {
                                    formData.filter_type !== "submitted" ?
                                    <input 
                                        type="text"
                                        name="filter" 
                                        placeholder="Name"
                                        onChange={e => handleChange(e)}
                                    />
                                    :
                                    <input 
                                        type="date"
                                        name="filter" 
                                        placeholder="Name"
                                        onChange={e => handleChange(e)}
                                    />
                                }
                    {/* </fieldset> */}
                        
                
                </form>
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
