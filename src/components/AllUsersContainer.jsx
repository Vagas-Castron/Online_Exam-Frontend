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
        filter_type: "first_name",
        filter: ""
    })
    const [loading, setLoading] = React.useState(false)
    const [ data, setData] = React.useState(useLoaderData())
    const location = useLocation()
    const username = location.state
    function handleClick(event){
        setFormTrigger( prevState => !prevState)
    }

    React.useEffect(() => {
        const token = retrieveData()?.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        console.log(formData)
        
        fetch(`http://${localhost}:8000/api/users/all`,
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
                    {/* <fieldset> */}

                        <lable for="filter">Filter By</lable>
                                <select name="filter_type"  onChange={e => handleChange(e)}>
                                    <option value="username">Username</option>
                                    <option value="first_name" selected={true}>First Name</option>
                                    <option value="last_name">Last Name</option>
                                    <option value="status">Status</option>
                                </select>
                                <input 
                                    type="text"
                                    name="filter" 
                                    placeholder="Name"
                                    onChange={e => handleChange(e)}
                                />
                    {/* </fieldset> */}
                        
                
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