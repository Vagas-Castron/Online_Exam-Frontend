import React from 'react'
import { Form, redirect, useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { TiArrowBack } from "react-icons/ti"
import { retrieveData } from '../utils'
import { MdCancel } from "react-icons/md"


// export async function action({ request }){
//     const token = retrieveData()?.token
//     const headers = {
//         'Authorization': `Token ${token}`,
//         'Content-Type': 'application/json'
//     }
//     const formData = await request.formData()
//     const userData = {
//         username: formData.get("username"),
//         first_name: formData.get("first_name"),
//         last_name: formData.get("last_name"),
//         status: formData.get("status"),
//         password: formData.get("password"),
//         confirm_password: formData.get("confirm_password")
//     }
//     try{
//         const response = fetch("http://localhost:8000/api/users/create-user", {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(userData)
//         })
//         const data = await response.json()
//         console.log(data)
//         return redirect("/user-management")
//     }catch(error){
//         return error.message
//     }
// }


export default function UserForm({formTrigger, userInfo, setChanges, submit, handleDelete, error}){
    const navigate = useNavigate()
    // const err = {...error}
    console.log(error)
    function handleClick(event){
        formTrigger(false)
        navigate("/user-management")
    }

    return (
        <div className='floating'>
            <div className="floating-fm">
                <div className='header-fm float'>
                    { userInfo? <h2>Edit User</h2> :<h2>Create New User</h2>}
                    <button className='nopad-btn' onClick={handleClick}>
                        <MdCancel size="1.5em"/>
                    </button>
                </div>
    
                <div className="error-container">
                    {error &&
                        <div className="error">
                            <span>{error.message}</span>
                        </div>
                }
                </div>
               {
                    userInfo?
                        <Form method="post" className='user-rel' onSubmit={e => submit(e)}>
                            <div className="form-content">
                                <input 
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                    value={userInfo.username}
                                    onChange={e => setChanges(e)}
                                />
                                <input
                                    type='text'
                                    name='first_name'
                                    placeholder='First Name'
                                    value={userInfo.first_name}
                                    onChange={e => setChanges(e)}
                                />
                                <input
                                    type='text'
                                    name='last_name'
                                    placeholder='Last Name'
                                    value={userInfo.last_name}
                                    onChange={e => setChanges(e)}
                                />
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='New Password'
                                    value={userInfo.password}
                                    onChange={e => setChanges(e)}
                                />
                                <input
                                    type='password'
                                    name='confirm_password'
                                    placeholder='Confirm New Password'
                                    value={userInfo.confirm_password}
                                    onChange={e => setChanges(e)}
                                />
                                <select 
                                    name="status" 
                                    value={userInfo.status}
                                    onChange={e => setChanges(e)}
                                >
                                    <option value=''>--Choose Status--</option>
                                    <option value='administrator'>Administrator</option>
                                    <option value='quality analyst'>Quality Analyst</option>
                                    <option value='team leader'>Team Leader</option>
                                    <option value='agent'>Call Center Agent</option>
                                </select>
                                <div className='btn-container'>
                                    <span></span>
                                    <button name="user-remover" onClick={e => handleDelete(e)}>Delete</button>
                                    <button type='submit'>Update</button>
                                    <span></span>
                                </div>
                            </div>
                        </Form>
                        :
                        <Form method="post" className='user-rel'>
                            <div className="form-content">

                                <input 
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                />
                                <input
                                    type='text'
                                    name='first_name'
                                    placeholder='First Name'
                                />
                                <input
                                    type='text'
                                    name='last_name'
                                    placeholder='Last Name'
                                />
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                />
                                <input
                                    type='password'
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                />
                                <select name="status" id="">
                                    <option value=''>--Choose Status--</option>
                                    <option value='administrator'>Administrator</option>
                                    <option value='quality analyst'>Quality Analyst</option>
                                    <option value='team leader'>Team Leader</option>
                                    <option value='agent'>Call Center Agent</option>
                                </select>
                                <div className='btn-container'>
                                    <span></span>
                                    <button type='submit'>submit</button>
                                    <span></span>
                                </div>
                            </div>
                        </Form>
                        
                }
            </div>
        </div>

    )
}