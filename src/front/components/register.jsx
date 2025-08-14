import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => { 
        e.preventDefault()
        console.log(password, email)
        try {
            const response = await fetch("https://automatic-xylophone-v6jpp6jp65q3x6v9-3001.app.github.dev/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            
            if (response.status == 201) {
                navigate("/demo")
            } else {
                alert(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <h1>Registro</h1>

            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default Register