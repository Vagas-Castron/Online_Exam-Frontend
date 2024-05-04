import React, { createContext, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { authentication, verifyToken, storeData, retrieveData } from "../utils"
import logo from "../assets/official logo.png"


async function handleAuth(data){
    authentication(data)
        .then(data => console.log(data))
    
    
}

function UserLogin() {
    const [authData, setAuthData] = React.useState(retrieveData())
    const [error, setError] = React.useState(null)
    const [status, setStatus] = React.useState("idle")
    const [userCredentials, setUserCredentials] = React.useState({
        username: "",
        password: ""
    })
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(()=>{
        storeData(authData)
        if(authData?.success){
            if(verifyToken(authData.token)){
                storeData(authData)
                if(authData.status?.toLowerCase() === "administrator"){
                    navigate("/exam-creation")
                }else{
                    navigate("/exam")
                }
            }
        }
        // if(retrieveData()?.token !== ""){
        //     if(verifyToken(authData.token)){
        //         storeData(authData)
        //         if(authData.username.toLowerCase() === "administrator"){
        //             navigate("/exam-creation")
        //         }else{
        //             navigate("/exam")
        //         }
        //     }
        // }
    },[authData, error])

    console.log(retrieveData())

    function handleChange(event){
        setError(null)
        const { name, value} = event.target
        setUserCredentials(
            prevState =>{
                return {
                    ...prevState,
                    [name]: value
                }
            }
        )
    }

    function handleFocus(event){
        const {name} = event.target
        setUserCredentials(
            prevState => {
                return {
                    ...prevState,
                    [name]: ""
                }
            }
        )
    }

    function handleSubmit(event){
        event.preventDefault()
        setStatus("submitting")
        console.log(status)
        authentication(userCredentials)
            .then(data => setAuthData(data))
            .catch(err => setError(err))
            .finally(() => setStatus("idle"))
        // console.log(response)

    }
    return (
        <div className="wrapper-container">
            <div className='login-container'>
                <div className='login-header'>
                    <img src={logo} alt="company logo" width={135} height={135}/>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="login-form">
                    <div>
                        <h4 className='error'>{error && error.message}</h4>
                        <input 
                            className="form-input"
                            type="text"
                            name="username"
                            value={userCredentials.username}
                            placeholder="Username"
                            onFocus={ (e) => handleFocus(e)}
                            onChange={(e) => handleChange(e)}
                        />
                        <input 
                            className="form-input"
                            type="password"
                            name="password"
                            value={userCredentials.password}
                            placeholder="password"
                            onFocus={ (e) => handleFocus(e)}
                            onChange={(e) => handleChange(e)}
                        />
                        <button
                            className=" form-button"
                            disabled={status === "submitting"}
                        >
                            {status === "submitting" ? "Logging in...": "Log in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserLogin