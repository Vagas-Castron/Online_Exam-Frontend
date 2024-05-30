import React from "react"
import { redirect, useActionData, useNavigate } from "react-router-dom"
import UserForm from "./UserForm"
import { retrieveData } from "../utils"
import LoadingComponent from "./LoadingComponent"



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
        const response = await fetch("http://localhost:8000/api/users/create-user", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if(response.status !== 200){
            throw data
        }
        console.log(data)
        return null
    }catch(error){
        return error
    }
}


export default function UserCreation({ formTrigger }) {
    const error = useActionData()
    const navigate = useNavigate()
    console.log(error)

    React.useEffect(() => {
        if(error === null){
            formTrigger(false)
            return navigate("/user-management")
        }
    })
    
    return(
        <>
            {/* <LoadingComponent /> */}
            <UserForm formTrigger={formTrigger} error={error}/>
        </>
    )
}