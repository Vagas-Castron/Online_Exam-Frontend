import React from "react"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import ExamCreateLayout, {loader as adminLoader} from "./layouts/ExamCreateLayout"
import UserLogin from "./components/UserLogin"
import Results, {loader as resultsLoader} from "./components/Results"
import Information from "./components/Information"
import ExamPage, { loader as examLoader} from "./components/exam-pages/ExamPage"

import './style.css'
import ContentLayout from "./layouts/ContentLayout"
import ExamCreationOptions from "./components/ExamCreationOptions"

// loader={examLoader}
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
          <Route index element={<UserLogin />}/>
          <Route element={<ContentLayout />}>
            <Route path="dashboard" element={<h1>Dashboard Goes Here</h1>} />
            <Route path="exam" element={<ExamPage />} />
            <Route path="exam-creation" element={<ExamCreationOptions />}  />
            <Route path="exam-creation/new-exam" element={<ExamCreateLayout />}  />
            <Route path="exam-creation/edit-exam" element={<h1>edit exam creation</h1>}  />
            <Route path="exam-creation" element={<ExamCreateLayout />}  />
            <Route path="results" element={<Results/>}  />
            <Route path="user-management" element={<h1>User Managing Page</h1>} loader={adminLoader} />
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