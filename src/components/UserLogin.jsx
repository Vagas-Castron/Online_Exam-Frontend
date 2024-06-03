import React, { createContext, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { authentication, verifyToken, storeData, retrieveData } from "../utils"
import logo from "../assets/official login logo.png"
import LoadingComponent from './LoadingComponent';


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
        if(authData){
            console.log("REDIRECT ION")
            if(authData.token){
                storeData(authData)
                switch(authData.status?.toLowerCase()){
                    case "administrator":
                        navigate("/user-management")
                        break
                    case "quality analyst":
                        navigate("/exam-creation")
                        break
                    case "agent":
                        navigate("/exam")
                        break
                    default:
                        console.log("Status not found")
                }
                // if(authData.status?.toLowerCase() === "administrator"){
                //     navigate("/exam-creation")
                // }else{
                //     navigate("/exam")
                // }
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
    },[authData])

    console.log(authData)

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
            .then(data => {
                setAuthData(data)
                // return navigate("/exam")
            })
            .catch(err => setError(err))
            .finally(() => setStatus("idle"))
        // console.log(response)

    }
    return (
        <>
            { status === "submitting"? <LoadingComponent/>: ""}
            {/* <div className='form-container login'> */}
                <form onSubmit={(e) => handleSubmit(e)} className='floating-fm user-rel log-in'>
                    <div className='login-header'>
                        <img src={logo} alt="company logo" width={135} height={135}/>
                    </div>
                    <div className="form-content">

                        <div className="error-container">
                            {
                                error? 
                                        <div className='error'>{error.message}</div>
                                        : ""
                            }
                        </div>
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
                                className=" login-button"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? "Logging in...": "Log in"}
                            </button>
                    </div>
                </form>
                {/* <div> */}

                {/* </div> */}
            {/* </div> */}
        </>
    )
}

export default UserLogin