import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useState } from "react";
import Footer from "../component/Footer";

export default function Signup() {
  const [confidential, setConfidential] = useState({ name: "", email: "", password: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    const response = await fetch("http://localhost:80/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: confidential.name,
          email: confidential.email,
          password: confidential.password,
          location: confidential.location,
        }),
      });
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Please enter valid details");
      }
      else{
        alert(`Your ID is created Thankyou ${confidential.name}😀 \n Now you can Login`)
      }
   }
   catch(error){
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
            <label htmlFor="exampleInputEmail1" className="form-label" required>Name</label>
            <input type="name" className="form-control" name="name" value={confidential.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" required>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={confidential.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" required>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={confidential.password} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" required>Location</label>
            <input type="text" className="form-control" id="exampleInputPassword1" name="location" value={confidential.location} onChange={onChange} />
          </div>

         
          <button type="submit" className="btn btn-primary btn-success">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
      <Footer/>
    </>
  );
}
