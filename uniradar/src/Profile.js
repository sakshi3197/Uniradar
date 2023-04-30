import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button.js";
import './Profile.css';

const Profile = () => {

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

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
      });
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: ''
      });;


    useEffect(() => {
        let userdata;

        console.log("In useeffect")
        const userEmail = Cookies.get('current_user');
        formData.username = userEmail;
        console.log("EMAIL:", formData.username);
        axios.post('https://uniradar-backend.onrender.com/fetch_details', formData).then(response => {
            setUser(response.data.data);
            console.log("HEREEEE response.data.data:", response.data.data);

          });
    }, []);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
        
const handleSubmit = event => {
  event.preventDefault();
  console.log("HERE:", user);

  axios.post('https://uniradar-backend.onrender.com/update_user', user).then(response => {
      console.log(" update response:", response);
      alert("Details have been updated");
      navigate("/universities")

    });

};

      const handleCancel = event => {
        navigate("/universities")
      };


      const handleDelete = event => {
        const userEmail = Cookies.get('current_user');
        formData.username = userEmail;
        console.log("EMAIL:", formData.username);
        axios.post('https://uniradar-backend.onrender.com/delete_account', formData).then(response => {
            console.log(" delete response:", response);
            alert("Your account has been deleted. You will be logged out automatically.");
            Cookies.set('isSessionLoggedIn', "false", { expires: 1 });
            Cookies.remove('current_user');
            navigate("/")

          });

      };




    return (
<Wrapper>
  <div className="whole_content">
    <div className="container">
      <h2 className="heading">USER PROFILE</h2>

      <form className="form_style" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>First Name: </label>
              </td>
              <td>
                <input
                  className="cred-input"
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Last Name: </label>
              </td>
              <td>
                <input
                  className="cred-input"
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button className="UpdateButton" type="submit">Update</Button>
                <Button className="CancelButton" type="button" onClick={handleCancel}>Cancel</Button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button className="DeleteButton" type="button" onClick={handleDelete}>Delete Account</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</Wrapper>
    )
}

export default Profile