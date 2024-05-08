import React from "react"
import { Link } from "react-router-dom"


export default function ExamCreationOptions(){
    return (
        <div className="create-options">
            <Link to="new-exam">
                <span>New Exam</span>
            </Link>
            <Link to="Edit-exam">
                <span>Edit Exam</span>
            </Link>
        </div>
    )
}