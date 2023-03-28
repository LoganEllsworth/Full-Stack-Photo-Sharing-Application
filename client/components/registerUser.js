import React, { Fragment, useState } from "react";

function RegisterUser({setToken}) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [hometown, setHometown] = useState("");
    const [gender, setGender] = useState();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();

    const onSubmitForm = async (e) => {
        setMessage();
        e.preventDefault();
        if (!firstname || !lastname || !email || !dob || !password) {
            setSuccess(false);
            setMessage("Please enter required fields.");
            return;
        }
        try {
            const body = {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "dob": dob,
                "hometown": hometown,
                "gender": gender,
                "password": password
            }
            const response = await fetch("http://localhost:5000/api/user/register", {
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
        setFirstname("");
        setLastname("");
        setEmail("");
        setDob("");
        setHometown("");
        setGender();
        setPassword("");
        setMessage();
    };

    return (
        <Fragment>
            <form className="w-50 bg-light rounded mx-auto" onSubmit={onSubmitForm}>
                <div className="col">
                    <h1>Register a new user</h1>
                    {message && <p className={success ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</p>}
                    <div className="row mt-2">
                        <div className="col">
                            <p>First Name:*</p>
                        </div>
                        <div className="col-10">
                            <input type="text" className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Last Name:*</p>
                        </div>
                        <div className="col-10">
                            <input type="text" className="form-control" value={lastname} onChange={e => setLastname(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Email:*</p>
                        </div>
                        <div className="col-10">
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Birthday:*</p>
                        </div>
                        <div className="col-10">
                            <input type="date" className="form-control" value={dob} onChange={e => setDob(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Hometown:</p>
                        </div>
                        <div className="col-10">
                            <input type="text" className="form-control" value={hometown} onChange={e => setHometown(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Gender:</p>
                        </div>
                        <div className="col-10">
                            <select className="form-control" value={gender} onChange={e => setGender(e.target.value)}>
                                <option></option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p>Password:*</p>
                        </div>
                        <div className="col-10">
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <button className="btn btn-success">Register</button>
                </div>
            </form>
        </Fragment>
    );
}

export default RegisterUser;