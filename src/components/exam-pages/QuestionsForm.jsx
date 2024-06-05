import React from "react"
import { MdOutlineCancel } from "react-icons/md"
import { TbTrashXFilled } from "react-icons/tb"

//exam page
export function ExamOption({ option, questionId, optionId, removeOption }) {
    function optionLetter(optionId){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return letters[optionId]
    }

    function handleClick(event){
        event.preventDefault()
        removeOption(optionId)
    }


    return (
        <li>
            <input 
                type="checkbox"
                name={`selector-${questionId}${optionLetter(optionId - 1)}`}
                // checked={option? option.correct: false}
                
            />
            <input
                type="text"
                name={`option-${questionId}${optionLetter(optionId - 1)}`}
                placeholder={`Option ${optionId}`}
                value={option && option.text} 
                readOnly={!!option}
            />
            {   
                !option &&   <div
                                className='option-rem'
                                onClick={e => handleClick(e)}
                            >
                                <MdOutlineCancel size="1.5em"/>
                            </div>
            }
        </li>
    );
}

export default function ExamQuestion({ question, questionId, removeQuestion}) {
    const [optionCount, setOptionCount] = React.useState(1);
    const [options, setOptions] = React.useState([{id: 1}]);
    // const [point, setPoint] = React.useState(1)

    React.useEffect(() => {
        const pointInput = document.querySelector("#point-input")
        function inputConditioning(e){
            console.log("number input")
            if(e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 40 || e.keyCode === 96 ){
                e.preventDefault()
                return false
            }
        }

        if(pointInput){
            pointInput.addEventListener( 'keydown', inputConditioning)
        }

        return () => {
            if(pointInput){
                pointInput.removeEventListener("keydown", inputConditioning)
            }
        }
    }, [])

    function handleClick(event) {
        event.preventDefault()
        const targetDiv = event.target.closest("div[data-name]")
        const name = targetDiv? targetDiv.getAttribute('data-name'): null
        console.log(name)
        if(name === "question-del"){
            removeQuestion(questionId)
        }else{
            setOptionCount(prevCount => prevCount + 1)
            setOptions(prevOptions => {
                const optionId = prevOptions.length + 1
                return [
                    ...prevOptions,
                    {id: optionId},
                ]
            });
        }
    }

    function removeOption(optionId){
        setOptions(prevOptions => {
            // console.log("deleting...", optionId)
            if(prevOptions.length > 0){
                const newOptions = prevOptions.filter(option => option.id !== optionId - 1)
                // setOptionCount(prevCount => prevCount - 1)
                const sortedOptions = newOptions.map((option, index) => {
                    return {id: index + 1}
                })
                console.log(newOptions)
                return sortedOptions
            }else{
                return prevOptions
            }
        })
    }

    return (
        <div className='question-container'>
            {
                !question?   <>   
                                <div className='question'>
                                    <textarea
                                        name={`question-${questionId}`}
                                        rows={1}
                                        placeholder="Enter Question"
                                    />
                                    <input
                                            type='number'
                                            name={`point-${questionId}`}
                                            id="point-input"
                                            min={1}
                                            max={10}
                                            placeholder='Point'
                                        />
                                    <div
                                        data-name="question-del"
                                        className='action-btn cancel-btn qn-rem'
                                        onClick={e => handleClick(e)}
                                        >
                                        <TbTrashXFilled size="1.5em" name="trash"/>
                                    </div>
                                </div>
                                    <ul>
                                        {options.map(
                                            option => <ExamOption 
                                                            key={option.id} 
                                                            questionId={questionId} 
                                                            optionId={option.id} 
                                                            removeOption={() => removeOption(option.id)}
                                                        />
                                                    )
                                                }
                                    </ul>
                                <div className='option-add' onClick={handleClick}>Add option</div>
                            </>
                        :   <>
                                <div className='question'>
                                    <textarea
                                        name={`question-${questionId}`}
                                        value={question? question.text: ""}
                                        readOnly={true}
                                        rows={1}
                                    />
                                    <span>{question.point} Points</span>
                                    {   !question && <div
                                                        data-name="question-del"
                                                        className='action-btn nopad-btn qn-rem'
                                                        onClick={e => handleClick(e)}
                                                        >
                                                        <TbTrashXFilled size="1.5em" name="trash"/>
                                                    </div>}
                                </div>
                                <ul>
                                    {question.options.map(
                                        (option, index) => <ExamOption 
                                                        key={index} 
                                                        questionId={questionId} 
                                                        optionId={index + 1} 
                                                        // removeOption={() => removeOption(option.id)}
                                                        option={option}
                                                    />
                                                )
                                    }
                                </ul>
                                { !question && <div className='option-add' onClick={handleClick}>Add option</div>}
                            </>
            }
        </div>
    );
}


