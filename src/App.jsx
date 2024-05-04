import React from "react"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import ExamCreateLayout, {loader as adminLoader} from "./layouts/ExamCreateLayout"
import UserLogin from "./components/UserLogin"
import Results, {loader as resultsLoader} from "./components/Results"
import Information from "./components/Information"
import ExamPage, { loader as examLoader} from "./components/exam-pages/ExamPage"

import './style.css'

// loader={examLoader}
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
          <Route index element={<UserLogin />}/>
          <Route path="exam" element={<ExamPage />} loader={examLoader}/>
          <Route path="exam-creation" element={<ExamCreateLayout />} loader={adminLoader} />
          <Route path="results" element={<Results/>} errorElement={<Information byPassing={true} process={null}/>} loader={resultsLoader}/>
        </Route>
      
    )
    )
    return(
      
        <RouterProvider router={router} />
      
  )
}



export default App