import React, {createContext} from "react"
import { useLoaderData, useNavigate, redirect } from "react-router-dom"
import Information from "../Information"
import examination from "../../assets/examination.json"
import Timer from "../Timer"
import Header from "../Header"
import Question from "../Question"
import { examSubmit, isAuthenticated } from "../../utils"
import { retrieveData } from '../../utils'

export async function loader() {
    
    if(isAuthenticated()){
        return examination
    }else{
        return redirect("/")
    }
}



function answerProcessor(answer){
    const filteredArray = answer.filter(obj => Object.keys(obj)?.length !== 0 || obj.points !== 0)
    return filteredArray
}

function timeStamp(){
    // Create a new Date object with the current date and time
    const currentDate = new Date();

    // Get the individual components of the date and time
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
    const month = currentDate.getMonth() + 1; // Get the month (0-11, add 1 to get the actual month)
    const day = currentDate.getDate(); // Get the day of the month (1-31)
    const hours = currentDate.getHours(); // Get the hour (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)
    const milliseconds = currentDate.getMilliseconds(); // Get the milliseconds (0-999)

    // Construct the datetime string in the desired format
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    // Log the formatted datetime
    console.log(formattedDateTime);
    return formattedDateTime

}



function ExamPage() {
    //const examination = useLoaderData()
    const [points, setPoints] = React.useState([])
    const [examQuestions, setExamQuestions] = React.useState(examination)
    const [status, setStatus] = React.useState("idle")
    const [confirmation, setConfirmation] = React.useState(false)
    const [ error, setError ] = React.useState(null)

    const navigate = useNavigate()

    React.useEffect(() => {
        const processedAnswer = answerProcessor(points)
        setPoints(processedAnswer)

        if(confirmation === false){
                setStatus("idle")
        }

    }, [confirmation])

    function updatePoints(questionPoints){

        // Find the index of the existing point with the same ID
        const existingIndex = points.findIndex(point => point.questionId === questionPoints.questionId);

        if (existingIndex !== -1) {
            // If the point exists, replace it with the new point
            const updatedPoints = [...points];
            updatedPoints[existingIndex] = questionPoints
            setPoints(updatedPoints)
        } else {
            // If the point doesn't exist, add it to the points array
            setPoints(prevPoints => [...prevPoints, questionPoints]);
        }
    }

    function handleClick(event){
        const { name } = event.target
        console.log(name)
        if(name === "submit"){
            setStatus("submitting")
            setConfirmation(prevState => !prevState)
            
        }else{
        }
    }
    
    function handleSubmit(event){
        event?.preventDefault()
        // let totalPoints = 0
        // Use reduce to iterate over the array and accumulate the sum of the updated values
        const score = points.reduce((acc, pnt) => {
            // Update the 'value' property of the current object and add it to the accumulator
            return acc + pnt.points;
        }, 0)

        const totalScore = examQuestions.reduce((acc, pnt) => {
            // Update the 'value' property of the current object and add it to the accumulator
            return acc + pnt.points;
        }, 0)

        setStatus("idle")
        const username = retrieveData().username
        const time = timeStamp()
        const resultData = {
            username: username,
            score: score,
            timeStamp: time
        }
        console.log(resultData)
        examSubmit(resultData)
            .then(() =>  navigate(
                                "/results", 
                                { state: { 
                                            score: score, 
                                            totalScore: totalScore, 
                                            exam: examQuestions 
                                        }, 
                                    replace: true
                                } 
                        )
                )
            .catch(err => setError(err))
    }

    const questions = examQuestions?.map( (question, index) => <Question key={index} question={question} setTotalPoints={updatePoints}/>)

    
//   React.useEffect(() => {
//     // Fetch JSON data from file
//     fetch(examination)
//     setTotalPoints(prevPoints => prevPoints + examQuestions.points); // Set JavaScript objects to state
//     }
//     ,[]); // Empty dependency array to run only once on component mount

// console.log(examQuestions)

    return (
        <>
                {/* <div className="questions-container"> */}
                {/* {
                    started ? 
                        <>
                    <Timer submit={handleSubmit}/> */}
                            {/* {
                                confirmation? 
                                        <Information 
                                            action={handleSubmit} 
                                            setConfirmation={setConfirmation} 
                                            byPassing={false} 
                                            process={"submit"}
                                            error={error}
                                        />
                                    : 
                                        ""  
                            } */}
                            <form 
                                className="questions-form" 
                                action="" 
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className="form-content">
                                    <>
                                        {questions}
                                    </>
                                    <button 
                                        className="submit-button" 
                                        name="submit" 
                                        onClick={(e) => handleClick(e)}
                                    >
                                        {status === "submitting"? "Submitting...":"Submit"}
                                    </button>
                                    
                                </div>
                            </form>
                {/* </div> */}
                    </>
        //         :
        //             <>
        //                 <div className="start-container">
        //                     <button 
        //                         className="form-button" 
        //                         name="start" 
        //                         onClick={(e) => handleClick(e)}
        //                     >
        //                         Start Exam
        //                     </button>
        //                 </div>
        //             </>
        //     }
        // </>
        
    )
}

export default ExamPage