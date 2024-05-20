import React from "react"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import ExamCreateLayout, {action as examCreationAction} from "./layouts/ExamCreateLayout"
import UserLogin from "./components/UserLogin"
import Results, {loader as resultsLoader} from "./components/Results"
import Information from "./components/Information"
import ExamPage, { loader as examLoader} from "./components/exam-pages/ExamPage"

import './style.css'
import ContentLayout from "./layouts/ContentLayout"
import ExamCreationOptions from "./components/ExamCreationOptions"
import AllExamcontainer, {loader as allExamLoader} from "./components/AllExamcontainer"
import AllUsersContainer, {loader as allUserLoader} from "./components/AllUsersContainer"
import {  action as userAction } from "./components/NewUserForm"

// loader={examLoader}
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
          <Route index element={<UserLogin />}/>
          <Route element={<ContentLayout />}>
            <Route path="dashboard" element={<h1>Dashboard Goes Here</h1>} />
            <Route path="exam" element={<ExamPage />} />
            <Route path="exam-creation" element={<AllExamcontainer/>} loader={allExamLoader}  />
            <Route path="exam-creation/new-exam" element={<ExamCreateLayout />}  action={examCreationAction}/>
            <Route path="results" element={<Results/>}  />
            <Route path="user-management" element={<AllUsersContainer />} loader={allUserLoader} action={userAction} />
          </Route>
      </Route>
      
    )
    )
    return (
      
        <RouterProvider router={router} />
      
  )
}



export default App

// loader={examLoader}

//loader={adminLoader}
//loader={resultsLoader}

//errorElement={<Information byPassing={false} process={null}/>}