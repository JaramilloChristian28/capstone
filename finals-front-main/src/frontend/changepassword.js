import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function handleChangePassword() {
        const userId = localStorage.getItem('user-id'); // Retrieve the user's ID from local storage

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        let result = await fetch(`http://127.0.0.1:8000/api/users/${userId}/change-password`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword
            })
        });

        result = await result.json();

        if (result.error) {
            alert(result.error);
        } else {
            alert(result.message);
            logoutUser(); // Call logout function after successful password change
        }
    }

    // Function to logout the user
    function logoutUser() {
        if (localStorage.getItem('user-info')) {
            localStorage.removeItem('user-info'); // Remove user info from local storage
            navigate('/login'); // Navigate to the login page
        } else {
            navigate('/login'); // If user info is not found, still navigate to login
        }
    }

    return (
        <div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Change Password</h2>
            <div>
                <label>Old Password:</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div>
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm New Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
}

export default ChangePassword;
