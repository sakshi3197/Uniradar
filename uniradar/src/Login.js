import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button.js";
import './Loginstyles.css';
import Cookies from 'js-cookie';
import axios from 'axios';


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

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });


  const usernameRef = useRef();
  const passwordRef = useRef();

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    console.log(username, password);


    if (!username || !password) {
      alert("Empty fields aren't allowed")
    }
    else {
      let valid;

      if (username === 'admin' && password === 'admin') {
        Cookies.set('isSessionLoggedIn', "true", { expires: 1 });
        alert("Log in Successful!");
        navigate("/universities");
      }
      else {
        console.log("Inside else")
        formData.username = username;
        formData.password = password;
        axios.post('http://127.0.0.1:5000/login', formData).then(response => {

          console.log(response)
          if (response.data.message === "login successfull") {
            Cookies.set('isSessionLoggedIn', "true", { expires: 1 });
            alert("Log in Successful!");
            navigate("/universities");
          }
          else {
            alert(response.data.message);
            valid = false;
          }

        });

      }

    }
    usernameRef.current.value = null;
    passwordRef.current.value = null;
  }

  return (
    <Wrapper>
      <div className="whole_content">
        <div className="container">
          <form className="form_style">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Email: </label>
                  </td>
                  <td>
                    <input class="cred-input" ref={usernameRef} placeholder="Enter your email"></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Password: </label>
                  </td>
                  <td>
                    <input class="cred-input" ref={passwordRef} placeholder="Enter your password" type="password"></input>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Button onClick={handleLogin}>Log In</Button>
                  </td>
                </tr>
                <tr>

                </tr>
              </tbody>
            </table>
          </form>
          <span class="to-register">
            New User? Register <a href="./registration">here</a>
          </span>

          <div class="home-link">
            <a href="./">Back to home</a>
          </div>
        </div>
      </div>

    </Wrapper>
  );
}

export default Login;
