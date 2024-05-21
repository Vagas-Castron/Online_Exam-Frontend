import { redirect} from "react-router-dom"
import { jwtDecode } from "jwt-decode"



export async function examSubmit(resultData){
  try{
    const response = await fetch('http://192.168.0.145:80/api/results.php', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(resultData)
    })
    const data = await response.json()
    console.log(data)

    if(data.resubmit){
      throw {
        message: data.message
      }
    }
    
    console.log(data)
  }catch(error){
    throw {
      message: error.message
    }
  }
}


export async function authentication( userCredentials ){
  // console.log(userCredentials)
  const username = `${userCredentials.username}`
  const password = userCredentials.password
  const jsonData = {"username": username, "password": password}

  try {
      const response = await fetch('http://localhost:8000/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      const data = await response.json()
      console.log(data)
      return data
    
  }catch (error) {
        throw {
          message: error.message
        }
  }

}

export function isAuthenticated(){
    const token = retrieveData()?.token; // Retrieve token from localStorage or wherever it's stored
    if (token) {
      const isValid = verifyToken(token);
      if (isValid) {
        console.log("Token is valid");
        // Proceed with authenticated actions
        return true
      } else {
        console.log("Token is invalid");
        // Handle invalid token (e.g., redirect to login)
        return false
      }
    } else {
      console.log("Token not found");
      // Handle missing token (e.g., redirect to login)
      return false
    }

}

export function isAdminAuthenticated(){
  if(isAuthenticated()){
    const username = retrieveData().username
    if(username.toLowerCase() === "administrator"){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}


// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check token expiration (if applicable)
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.log("Token expired");
      return false;
    }

    // Optionally, you can check other token claims here

    // Token is valid
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
// Function to handle storing data in session storage
export const storeData = (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
};
// Function to handle retrieving data from session storage

export const retrieveData = () => {
    return JSON.parse(sessionStorage.getItem('userData'));
};
// Function to handle clearing data from session storage

export const clearData = () => {
    sessionStorage.removeItem('userData');
};


export function reformatFormData(formData) {
  const data = {
      title: formData.get('title'),
      timer: formData.get('timer'),
      description: formData.get('description'),
      questions: [],
  };

  const questions = {};
  
  formData.forEach((value, key) => {
      const questionMatch = key.match(/^question-(\d+)$/);
      const optionMatch = key.match(/^option-(\d+)([A-Z])$/);
      const selectorMatch = key.match(/^selector-(\d+)([A-Z])$/);

      if (questionMatch) {
          const questionId = questionMatch[1];
          if (!questions[questionId]) {
              questions[questionId] = {
                  text: value,
                  options: [],
              };
          } else {
              questions[questionId].text = value;
          }
      } else if (optionMatch) {
          const questionId = optionMatch[1];
          const optionId = optionMatch[2];
          if (!questions[questionId]) {
              questions[questionId] = {
                  text: '',
                  options: [],
              };
          }
          questions[questionId].options.push({
              id: optionId,
              text: value,
              correct: false,
          });
      } else if (selectorMatch) {
          const questionId = selectorMatch[1];
          const optionId = selectorMatch[2];
          if (questions[questionId]) {
            const option = questions[questionId].options.find((option) => console.log("debug"))
            console.log(optionId)
            console.log(option)
              if (option) {
                  option.correct = true;
              }
          }
      }
  });

  Object.keys(questions).forEach(questionId => {
      data.questions.push({
          text: questions[questionId].text,
          options: questions[questionId].options,
      });
  });

  return data;
}