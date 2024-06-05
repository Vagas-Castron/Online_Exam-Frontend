import React from "react"
import { useLoaderData } from "react-router-dom"
import { retrieveData, isAuthenticated, localhost } from "../utils"
import AgentResult from "./AgentResult"
import AllResult from "./AllResult"


export async function loader() {
    
    console.log("Hello")
    if(isAuthenticated()){
        const token = retrieveData()?.token
        const userId = retrieveData().username.slice(-4)
        const status = retrieveData().status
        
        const headers = {
            'Authorization': `Token ${token}`,
            // 'Content-Type': 'application/json'
        }
        try{
            if( status === "agent"){
                const response = await fetch(`http://${localhost}:8000/api/exam/result/${userId}`,
                {
                        method: 'GET',
                        headers: headers,
                        // body: JSON.stringify({username: username})
                    }
                )
                const data = await response.json()
                if(response.status !== 200){
                    throw {
                        message: data.message,
                    }
                }
                return data
            } else {
                const response = await fetch(`http://${localhost}:8000/api/exam/all_result`,
                {
                        method: 'GET',
                        headers: headers,
                        // body: JSON.stringify({username: username})
                    }
                )
                const data = await response.json()
                if(response.status !== 200){
                    throw {
                        message: data.message,
                    }
                }
                return data

            }
        }catch(error){
            console.log(error.message)
            return error
        }
    }else{
        return redirect("/")
    }
}

export default function Result(){
    const data = useLoaderData()
    console.log(data)
    const status = retrieveData().status

    return (
        status === "agent"? <AgentResult data={data}/>: <AllResult data={data}/>
    )

}