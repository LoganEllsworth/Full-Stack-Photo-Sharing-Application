import React, { Fragment, useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const onSubmitForm = async (e) => {
        setMessage("");
        e.preventDefault();
        if (!email || !password) {
            document.getElementById("message").className = "alert alert-danger";
            setMessage("Please enter both email and password.");
            return;
        }
        try {
            const body = {
                "email": email,
                "password": password
            }
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.status === 201) {
                clearForm();
                document.getElementById("message").className = "alert alert-success";
                setMessage("Login successful");
            } else {
                document.getElementById("message").className = "alert alert-danger";
                setMessage("Invalid password");
            }
            console.log(response);
        } catch (e) {
            console.error(e.message);
        }
    }

    const clearForm = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <Fragment>
            <form className="w-50 bg-light rounded mx-auto" onSubmit={onSubmitForm}>
                <div className="col">
                    <h1>Login</h1>
                    <p role="alert" id="message">{message}</p>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Email:</p>
                        </div>
                        <div className="col-10">
                            <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Password:</p>
                        </div>
                        <div className="col-10">
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <button className="btn btn-success">Login</button>
                </div>
            </form>
        </Fragment>
    );
}

export default Login;