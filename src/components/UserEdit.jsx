import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import UserForm from "./UserForm"
import { retrieveData } from "../utils"




export default function UserEdit({ formTrigger, userData }) {
    const navigate = useNavigate()
    const [error, setError] = React.useState()
    const [userInfo, setUserInfo ] = React.useState({
        username: userData[0]?.username || "",
        first_name: userData[0]?.first_name || "",
        last_name: userData[0]?.last_name || "",
        password: "",
        confirm_password: "",
        status: userData[0]?.status || ""
    })

    React.useEffect(() =>{

        if(userData.length === 0){
            return navigate("/user-management")
            
        }
    }, [])

    function handleChange(event){
        const { name, value } = event.target
        setUserInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
        setError(error => null)
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(userInfo)
        const token = retrieveData().token
        fetch('http://localhost:8000/api/users/update-user', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => {
            if(response.status !== 200){
                return response.json().then( data => {
                    throw data || {message: "Something Went Wrong!..."}
                })
            }
            return response.json()
        })
        .then( data => {
            navigate("/user-management")
        })
        .catch(error => setError(error))
    }
    
    function handleDelete(event){
        event.preventDefault()
        const token = retrieveData().token
        const username = retrieveData().username
        try{

            if(userInfo.username !== username){
                fetch('http://localhost:8000/api/users/update-user', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify(userInfo)
                })
                .then(data => navigate("/user-management"))
                .catch(error => console.log(error.message))
            }else {
                throw {message: "you can not delete your account"}
            }
        } catch(error){
            setError(error)
        }
    }

    return (
        <UserForm 
            formTrigger={formTrigger} 
            userInfo={userInfo} 
            setChanges={handleChange} 
            submit={handleSubmit}
            handleDelete={handleDelete}
            error={error}
        />
    )
}