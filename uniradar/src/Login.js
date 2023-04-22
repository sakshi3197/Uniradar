import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button.js";
import './Loginstyles.css'

function Login() {



  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;
    .container {
      margin-top: 6rem;
      .contact-form {
        max-width: 50rem;
        margin: auto;
        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  const usernameRef = useRef();
  const passwordRef = useRef();

  let navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    console.log(username, password);


    if (!username || !password){
      alert("Empty fields aren't allowed")
    }
    else{
     

    let valid ;
    if(username === 'adesh' && password === 'adesh' || username === 'manas' && password === 'manas'){
      valid = true;
    }
    else{
      valid = false;
    }

    if (valid) {
      alert("Log in Successful!");
      console.log("Log in Success! Welcome, " + username + "!");
      //sessionStorage.setItem("username",username)
      const details = {username: username};
      navigate("/universities", { state: details });
    }
    }
    usernameRef.current.value = null;
    passwordRef.current.value = null;
  }

  return (
    <Wrapper>
    <div>
      <form>
        <div>
          <label >Email: </label>
          <input class="cred-input" ref={usernameRef} placeholder="Enter your email"></input>
        </div>
        <div>
          <label>Password: </label>
          <input class="cred-input" ref={passwordRef} placeholder="Enter your password" type="password"></input>
        </div>
        <div class="login-btn">
          <Button onClick={handleLogin}>Log In</Button>
          </div>
        <span class="to-register">
          New User? Register <a href="./registration">here</a>
        </span>
      </form>
      <div class="home-link">
        <a href="./">Back to home</a>
      </div>
    </div>
    </Wrapper>
  );
}

export default Login;
