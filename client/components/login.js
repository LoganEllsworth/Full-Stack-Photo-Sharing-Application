import React, { Fragment, useState } from "react";

function Login({setToken}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();

    const onSubmitForm = async (e) => {
        setMessage();
        e.preventDefault();
        if (!email || !password) {
            setSuccess(false);
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
            const results = await response.json();
            setSuccess(results?.success);
            setMessage(results?.message);
            if (results.success) {
                setToken(results.user);
                clearForm();
                window.location.href = "/";
            }
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
                    {message && <p className={success ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</p>}
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