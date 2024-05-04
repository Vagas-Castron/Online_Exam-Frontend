import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { clearData } from "../utils"

function Information({ action, setConfirmation, byPassing, process, error }){
    const navigate = useNavigate()
    function handleClick(event){
        const { name } = event.target
        if(name === "proceed"){
            action()
        }else if(name === "logout"){
            clearData()
            navigate("/")
            
        }else{
            setConfirmation(false)
        }


    }
    return (
            <div className="information-container">
                <div className="information-box">
                    {/* { error && <h4 className="error">{`${error.message}`}</h4>} */}
                    {
                        process !== null? 
                            <>
                                <h2 className={error? 'error': ''}>{error? `${error.message}`: `You are about to ${process}`} </h2>
                                <h4 className={error? 'error': ''}>{error? 'You can not submit more than once...': `Are you sure you want to continue...`}</h4>
                            
                            </>
                        :
                            <>
                                <h2>You can not view this page</h2>
                                <div>Please go Answer the questions</div>
                            </>
                    }
                    <div className="information-option-btn">
                        {
                            byPassing ? 
                                <NavLink to="../exam">
                                    Exam Page
                                </NavLink>
                                :
                                <>
                                   { error?
                                    <button 
                                            className="btn green" 
                                            name="logout"
                                            onClick={(e) => handleClick(e)}
                                            >
                                                Log Out
                                        </button>
                                        :
                                        <button 
                                            className="btn green" 
                                            name="proceed"
                                            onClick={(e) => handleClick(e)}
                                            >
                                                Proceed
                                        </button>
                                    }
                                    <button 
                                        className="btn red" 
                                        name="cancel" 
                                        onClick={(e) => handleClick(e)}
                                        >
                                            Cancel
                                    </button>
                                </>
                        }
                        
                    </div>
                </div>
            </div>
    )
}


export default Information