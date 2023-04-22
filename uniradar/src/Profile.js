import React from 'react';
import Cookies from 'js-cookie';


const Profile = () => {
    useEffect(() => {
        const userEmail = Cookies.get('current_user');

        fetch(`http://localhost:5001/api/getUserDetails/${userEmail}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error.message);
            });
    }, []);

  return (
    <div>Profile</div>
  )
}

export default Profile