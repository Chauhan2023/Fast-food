import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useState } from "react";
import Footer from "../component/Footer";

export default function Login() {
  const [confidential, setConfidential] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:80/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: confidential.email,
          password: confidential.password,
        }),
      });
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Please enter valid details");
      }

      if(json.success){
        localStorage.setItem("authToken",json.authToken);
        localStorage.setItem("email", confidential.email)
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }

    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  function onChange(event) {
    setConfidential({ ...confidential, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Navbar />
      <div className="m-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={confidential.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={confidential.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-success">Login</button>
          <Link to="/signup" className="m-3 btn btn-danger">I am a new user</Link>

        </form>
      </div>
      <Footer/>
    </>
  );
}
