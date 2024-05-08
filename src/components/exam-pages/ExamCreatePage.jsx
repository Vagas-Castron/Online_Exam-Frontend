import React from "react"
import  { TiDeleteOutline } from "react-icons/ti"


const choiceControl = (option, optionSetter) => {
    // const choice = selectedChoices
    // Check if the choice is already selected
    if (selectedChoices.includes(choice)) {
    //     // If selected, remove it from the selectedChoices array
        return setSelectedChoices(selectedChoices.filter(item => item !== choice));
    } else {
    //     // If not selected and maximum possible choice is not reached, add it to the selectedChoices array
        if( selectedChoices.length < question.possibleChoiceCount ){
            return setSelectedChoices([...selectedChoices, choice]);
        }
    }
}


function valueControl(value){
    if(value <= 0){
        return 1
    }
    else{
        return value
    }
}


export function handleChange(index, event){
        
    const {name, type, value} = event.target
    setQuestion(prevState => {

        const updatedOptions = [...prevState.options]
        let updatedChoiceCount = prevState.choiceCount
            if(index !== null){
                updatedOptions[index] = {
                    ...updatedOptions[index],
                    [name]: type === "checkbox" ? !updatedOptions[index].truthness: value
                }
                if(type === "checkbox"){
                    updatedChoiceCount = updatedOptions[index].truthness? prevState.choiceCount++
                                                                        : prevState.choiceCount--
                }
            }
        

        return {
            ...prevState,
            options: updatedOptions,
            choiceCount: updatedChoiceCount,
            question: name === "question"? value: prevState.question,
            points: name === "points"? value: prevState.points,
        }

    })
    if(name === "optionCount"){
        setOptionCount(valueControl(value))
    }
    
}


function ExamCreatePage({ data, updateData }) {
    const [optionCount, setOptionCount] = React.useState(1)
    const [questionList, setQuestionList] = React.useState([])
    const [question, setQuestion] = React.useState({
        id: 1,
        points: 1, 
        question: "",
        choiceCount: 0,
        options: [],
    });

    // Function to create the default options array
    const createOptions = (initialize) => {
        const letters = "abcdefghijklmnopqrstuvwxyz"
        const newOptions = Array.from({ length: optionCount }, (_, index) => {
            const existingOption = question.options[index];
            
            if(existingOption && !initialize){
                return existingOption
            }else{
  
                    return {
                        optionId: `${question.id}${letters[index].toLocaleUpperCase()}`,
                        optionValue: "",
                        truthness: false,
                        index: index
                    }
            }
        })
        return newOptions
    }

    console.log(question)
    React.useEffect(() => {
        setQuestion(prevQuestion => ({
            ...prevQuestion,
            choiceCount: 0,
            options: createOptions(false),
        }
    ),[])

        const textarea = document.querySelector('#auto-resize-textarea');

        function handleTextareaInput() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }

        textarea.addEventListener('input', handleTextareaInput);
        
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleTextareaInput);
            }
        }
    }, [optionCount]);

    
    console.log(question.choiceCount)

    function addOPtion(event){
        setOptionCount( count => count + 1)
    }


    function handleSubmit(event){
        event.preventDefault()
        console.log(question)
        setQuestionList(prevList => [...prevList, question])
        updateData(question)
        
        setQuestion(prevQuestion => {
            let updateId = prevQuestion.id + 1
            return {
                id: updateId,
                points: 1,
                choiceCount: 0,
                question: "",
                options: [],
            }
        })
        setOptionCount(1)
    }  

    // console.log(question)
    return (
        <>
                        <section className="question-section">
                            <div className="point-container point-container-uniq">
                            <label>
                                <input type="number" name="points" value={question.points} onChange={(e) => handleChange(null, e)}/>
                                <span> Points</span>
                            </label>
                            </div>
                            <div className="question-container">
                                <div>
                                    <textarea 
                                        id="auto-resize-textarea"
                                        name="question" 
                                        rows={1}
                                        value={question.question} 
                                        placeholder="Enter Question" 
                                        autoFocus={true}
                                        onChange={(e) => handleChange(null, e)}
                                    />
                                </div>
                                {/* <div>
                                    <select name="" id="">
                                        <option value="">Multiple choice</option>
                                        <option value="">Text</option>
                                    </select>
                                </div>
                                <div className="option-container">
                                    <input className="noncheckbox" type="text"/>
                                </div> */}
                                <div className="option-container">
                                    {question.options.map((data, index) => (
                                        <div className="option" key={`option-${data.optionId}`}>
                                            <div>
                                                <input type="checkbox" name="truthness" checked={data.truthness} onChange={(e) => handleChange(index, e)}/>
                                            </div>
                                            <input 
                                                className="noncheckbox"
                                                id="myInput"
                                                type="text" 
                                                name="optionValue" 
                                                placeholder={`Option ${(index + 1)}`}
                                                value={data.optionValue}
                                                onChange={(e) => handleChange(index, e)} 
                                            />
                                            <span className="remove-option-button" onClick={() => setOptionCount( count => valueControl(count - 1))}><TiDeleteOutline /></span>

                                        </div>
                                    ))}
                                    <span className="edit-button" onClick={(e) => addOPtion(e)}>Add Option</span><br/>
                                </div>
                            </div>
                            <div className="edit-delete-btns">  
                                <span className="delete-button" onClick={() => handleClick(index)}>delete</span>
                            </div>
                        </section>
                <button className="form-button" onClick={(e) => handleSubmit(e) }>Add Question</button>
        </>
    );
}

export default ExamCreatePage;
