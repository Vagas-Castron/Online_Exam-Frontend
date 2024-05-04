import React from "react"

const choiceControl = (optionId, question, selectedChoices, setSelectedChoices) => {
    // const choice = selectedChoices
    // Check if the choice is already selected
    if (selectedChoices.includes(optionId)) {
    //     // If selected, remove it from the selectedChoices array
        return setSelectedChoices(selectedChoices.filter(item => item !== optionId));
    } else {
    //     // If not selected and maximum possible choice is not reached, add it to the selectedChoices array
        if( selectedChoices.length < question.choiceCount ){
            return setSelectedChoices([...selectedChoices, optionId]);
        }
    }
}
//A component that deals with creating multiple choices and checkboxes to each and every question
//It accepts a "question" property from a parent component to make sure multiple choices created are 
//specific to a given question

function selector(options, selectedChoices, handleChange){
    return options?.map((option, index) => (
        <input 
            key={index}
            id={`choice-${option.optionId}`} //Make sure when label is clicked also checkbox selection is triggered
            type="checkbox" 
            name={`choices-${option.qnid}`}
            checked={selectedChoices.includes(option.optionId)} //Control checkbox selection
            onChange={(e) => handleChange(option.optionId)} //Responsible for updating changes when choice selection is performed
        />
    )
)
}



function option(options, selector){
    return  options?.map(
        (option, index) => (
            <div key={index} className="option">
                    <span>{selector[index]}</span>
                    <label htmlFor={`choice-${option.optionId}`}>
                        <span>{option.optionValue}</span>
                    </label>
            </div>
        )
    )
}

function Choices({ question, getPoints }) {
    //state that stores the data about selected choices and used to control selection of checkboxes
    const [selectedChoices, setSelectedChoices] = React.useState([]);
    const [answer, setAnswer] = React.useState([])
    const [points, setPoints] = React.useState(0)

    React.useEffect(() => {
        const trueOptions = question.options.filter(option => option.truthness === true)
        const answer = trueOptions.map(option => option.optionId)
        setAnswer(answer)
    },[])

    React.useEffect(() => {
        let updatedPoints = 0;
        if (answerValidator(answer, selectedChoices)) {
            updatedPoints = Number(question.points);
        }
        // setPoints(updatedPoints);
        getPoints(updatedPoints, question.id);
    }, [selectedChoices]);

    // console.log(points)

    const options = question.options
    // console.log(choices)
    const handleChange = (optionId) => {
        choiceControl(optionId, question, selectedChoices, setSelectedChoices)
    }
    // console.log(selectedChoices)
    // console.log(answer)

    function isSubset(subset, superset) {
        for (let i = 0; i < subset.length; i++) {
            if (!superset.includes(subset[i])) {
                return false;
            }
        }
        return true;
    }
    
    // console.log(isSubset(array2, array1));

    function answerValidator(answer, selectedChoices) {
        // Check if arrays have different lengths
        if (answer.length !== selectedChoices.length) {
            return false;
        }

        if(isSubset(selectedChoices, answer)){
            if(selectedChoices.length === 0){
                return false
            }
            return true;
        }
        return false
        
    }

    
    //creating dynamic list of checkboxes for mapping choices to be selected
    const choiceSelectors = selector(options, selectedChoices, handleChange)
    //Creating a dynamic list of options/ choices/ multiple choices 
    const choiceOptions = option(options, choiceSelectors)

    //Displays the dynamic lists of multiple choices and checkboxes
    return (
        <div className="option-container">
            {choiceOptions}
        </div>
        
    )
}

//A component that create questions
function Question({ question, setTotalPoints }) {
    const [questionPoints, setQuestionPoints] = React.useState({
        questionId: "",
        points: 0,
    })
    // console.log(question)

    React.useEffect(() => {
        setTotalPoints(questionPoints)
    },[questionPoints.points, questionPoints.questionId])

    function getPoints(pointScored, id){
        setQuestionPoints(
            {
                questionId: id,
                points: pointScored,
        }
       )
    }
    // console.log(questionPoints)
    return (
        <section className="question-section">
            {/* <div className="point-container point-container-uniq">
                       
                <span>{question.points}</span> 
                <span>Points</span>
                        
            </div> */}
            <div className="question-container">
                <div className="question">
                    <span>{question.id}.</span>
                    <span className="qn-span">{question.question}</span>
                </div>
                    <Choices question={question} getPoints={getPoints}/> {/*a child component to create dynamic multiple choices*/}
            </div>
            {/* <div className="point-container"><span>{question.points} points</span></div> */}
        </section>
    )
}

export default Question