import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./styles/Button.js";
import axios from 'axios';
import './Regstyles.css'
import PasswordChecklist from "react-password-checklist";
import validator from "validator";

function Registration() {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setMessage("");
    } else {
      setMessage("Please, enter valid Email!");
    }
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!fname || !lname || !username || !password) {
      alert("Empty fields aren't allowed")
    }
    else {
      formData.firstname = fname
      formData.lastname = lname
      formData.username = username
      formData.password = password

      const response = await axios.post('http://127.0.0.1:5000/register', formData);
      alert(response.data.message);
      navigate("/login");
    }
    fNameRef.current.value = null;
    lNameRef.current.value = null;
    usernameRef.current.value = null;
    passwordRef.current.value = null;
  }

  return (
    <div className="whole_content">
      <div class="reg-form">
        <form>
          <div>
            <label>First Name: </label>
            <input class="cred-input" ref={fNameRef} placeholder="Enter your first name"></input>
          </div>
          <div>
            <label>Last Name: </label>
            <input class="cred-input" ref={lNameRef} placeholder="Enter your last name"></input>
          </div>
          <div>
            <label>Email: </label>
            <input class="cred-input" ref={usernameRef} onChange={(e) => validateEmail(e)} placeholder="Enter your email"></input>
            <div class="error-msg">
              <span
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                {message}
              </span></div>
          </div>
          <div>
            <label>Password: </label>
            <input class="cred-input" ref={passwordRef} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" type="password"></input>
            <div class="pwd-checklist">
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={5}
                value={password}
                onChange={(isValid) => { }}
              /></div>
          </div>
          <div class="reg-btn">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
          <span class="to-login">
            Already Registered? Log in <a href="./login">here</a>
          </span>
        </form>
      </div>
      <div class="reg-home-link">
        <a href="./">Back to home</a>
      </div>
    </div>
  );
}

export default Registration;
