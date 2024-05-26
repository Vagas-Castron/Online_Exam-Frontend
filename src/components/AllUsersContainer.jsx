import React from 'react'
import { useLoaderData, Link, redirect } from 'react-router-dom'
import { isAuthenticated, retrieveData } from '../utils'
import { TiUserAdd } from "react-icons/ti"
import NewUserForm from './NewUserForm'


// export async function action(){
//     console.log("Action here")
// }


export async function loader(){
    if(isAuthenticated()){
        const token = retrieveData()?.token
        const headers = {
            'Authorization': `Token ${token}`,
            // 'Content-Type': 'application/json'
        }
        const response = await fetch('http://localhost:8000/api/users/all',
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

export default function AllUsersContainer(){
    const [formTrigger, setFormTrigger] = React.useState(false)
    const data = useLoaderData()
    const list = data.map((d)=> (<div>{d.create}</div>))

    function handleClick(event){
        // const { id } = event.target
        // console.log(event.target)
        setFormTrigger( prevState => !prevState)
    }

    return (
        <>
            {
                formTrigger? <NewUserForm formTrigger={setFormTrigger}/>: ''
            }
            <div>
                <table className='listing-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr>
                                <td>
                                    <Link to="" className='row-link'>
                                        {d.username}
                                    </Link>
                                </td>
                                <td>{d.first_name}</td>
                                <td>{d.last_name}</td>
                                <td>{d.status}</td>
                            </tr>                   
                        ))}
                    </tbody>
                    <button className='action-btn pos-right' onClick={e => handleClick(e)} id='trigger-btn'>
                        <TiUserAdd size="1.5em"/>
                        {/* <span>Add User</span> */}
                    </button>
                </table>
            </div>
        </>
    )
}