import React from 'react'
import { useLoaderData, Link, redirect, useLocation, Form } from 'react-router-dom'
import { isAuthenticated, localhost, retrieveData } from '../utils'
import { TiUserAdd } from "react-icons/ti"
import UserCreation from './UserCreation'
import UserEdit from './UserEdit'
import LoadingComponent from './LoadingComponent'


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
        const response = await fetch(`http://${localhost}:8000/api/users/all`,
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
    const [formData, setFormData] = React.useState({
        username: "",
        name: "",
        status: ""
    })
    const [loading, setLoading] = React.useState(false)
    const data = useLoaderData()
    const location = useLocation()
    const username = location.state
    console.log(location)
    function handleClick(event){
        setFormTrigger( prevState => !prevState)
    }

    function handleChange(event){
        const { name, value } = event.target
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
            {/* <LoadingComponent /> */}
            { formTrigger? <UserCreation formTrigger={setFormTrigger}/>: ''}
            { 
                username && <UserEdit 
                                formTrigger={setFormTrigger} 
                                userData={data.filter(user => user.username === username)}
                            />
            }
            
            <div>
            <form method="post" className="filter">
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
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>
                                    Name: 
                                </label>
                                <input 
                                    type="text"
                                    name="name" 
                                    placeholder="Name"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>
                                    Status: 
                                </label>
                                <input 
                                    type="text"
                                    name="status" 
                                    placeholder="Status"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                    </fieldset>
                        
                
                </form>
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
                        {data.map((d, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to="/user-management" state={d.username} className='row-link'>
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