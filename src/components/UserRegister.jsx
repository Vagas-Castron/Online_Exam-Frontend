import React from "react"


export default function UserRegister(){
    return (
        <Form>
            <div className="form-content">
                <input
                    type="text"
                    name="first_name" 
                    placeholder="First Name"
                />
                <input 
                    type="text"
                    name="middle_name"
                    placeholder="Middle Name"
                />
                <input 
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Passwor"
                />
            </div>
        </Form>
    )
}