import React from "react"



function deleteItem(button) {
    // const element = document.querySelector('.delete-button')
    const questionContainer = button.closest('.question-container');
  
    // Add CSS class to fade out item
    questionContainer.classList.add('hidden');
    console.log(button)
    // After transition, remove item from DOM
    setTimeout(() => {
      questionContainer.remove();
    }, 500); // Wait for the transition duration
}



// Function to send questions data to PHP endpoint
function sendDataToPHP(dataSubmitted) {
    // axios.post('http://localhost:80/api/index.php', dataSubmited)
    return fetch('http://192.168.0.145:3000/write-to-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSubmitted),
    })
    .then(response => {
        // Return the response status
        return response.status
    })
    // .then(data => {
    //     console.log('Success:', data);
    //     // Handle success response from PHP if needed
    // })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });

}

  


function ExamPreviewPage({ data, updateData }) {
    const [questionList, setQuestionList] = React.useState([])
    console.log(questionList)

    React.useEffect(() => {
        setQuestionList(data);
    }, [data]);

    function optionSelector(qn){
        return qn.options.map( option =>
            <>
                <input type="checkbox" name="" id="" checked={option.truthness} />
            </>

        )
    }

    

    function option(qn, optionCheckbox){
          return  qn.options.map( (option, index) => 
            <div className="option">
                <span>{optionCheckbox[index]}</span>
                <span>{option.optionValue}</span>
            </div>
        )
    }

    function handleClick(index){
        const questionSelected = questionList[index]
        // const updatedData = [...data];
        // setQuestionList(prevList => prevList.splice(index, 1))
        updateData(questionSelected)
        
        // deleteItem(event.target)
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const responceStatus = sendDataToPHP(questionList); // Call function to send data to PHP
        console.log(responceStatus)
    }


    const question = questionList.map((qn, index)=> {
    const optionCheckbox = optionSelector(qn)
        return (
            <section className="question-section">
                  {/* <div className="point-container point-container-uniq">
                       
                       <span>{qn.points}</span> 
                       <span>Points</span>
                               
                   </div> */}
                <div className="question-container">
                    <div className="question"><span>{qn.id}.</span><span>{ qn.question }</span></div>
                    <div className="choice-container">
                        <div className="choice-options">
                            {option(qn, optionCheckbox)}
                        </div>
                    </div>
                    <div className="edit-delete-btns">  
                        <span className="delete-button" onClick={() => handleClick(index)}>delete</span>
                        <span className="edit-button">Edit</span> 
                    </div>
                </div>
                <div className="point-container"><span>{qn.points} points</span></div>
            </section>
        )
    })

    return (
        <>
            <div className="question-preview-form">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    {question}
                    {questionList.length > 0 && <button className="form-button">Submit</button>}
                </form>
            </div>
            {questionList.length > 0 && <hr/>}
        </>
    )
}

export default ExamPreviewPage

