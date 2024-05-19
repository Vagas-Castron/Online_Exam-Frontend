import React from 'react'
import { Form, redirect } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { TiArrowBack } from "react-icons/ti"
import { retrieveData } from '../utils'
import { MdCancel } from "react-icons/md"


export async function action({ request }){
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    const formData = await request.formData()
    const userData = {
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        status: formData.get("status"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password")
    }
    try{
        const response = fetch("http://localhost:8000/api/users/create-user", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        console.log(data)
        return redirect("/user-management")
    }catch(error){
        return error.message
    }
}


export default function NewUserForm({formTrigger}){

    function handleClick(){
        formTrigger(false)
    }
    return (
        <div className='form-container floating-container'>
            <Form method="post" className='user-form floating-form'>
                <div className='form-header'>
                    <h2>Create New User</h2>
                    <button className='cancel-btn' onClick={handleClick}>
                        <MdCancel size="1.5em"/>
                    </button>
                </div>
                <div className='input-container'>    
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
                        <option value='agent'>Customer Care Agent</option>
                    </select>
                    <div className='btn-container'>
                        <button>submit</button>
                        
                    </div>
                </div>
            </Form>
        </div>

    )
}