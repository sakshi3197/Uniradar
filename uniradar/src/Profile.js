import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';


const Profile = () => {

    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
      });
    

    useEffect(() => {
        console.log("In useeffect")
        const userEmail = Cookies.get('current_user');
        formData.username = userEmail;
        console.log("EMAIL:", formData.username);
        axios.post('http://127.0.0.1:5000/fetch_details', formData).then(response => {
            console.log("Inside Axios")
            console.log(response)  
          }).then(data => {
            console.log("DATA CAME:",data)
          });
  
        // fetch(`http://localhost:5001/fetch_details}`, {

        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log("DATA FETCHED:", data)
        //     })
        //     .catch(error => {
        //         console.error('Error fetching user details:', error.message);
        //     });


    }, []);

    return (
        <div>Profile</div>
    )
}

export default Profile