import React, { useState } from 'react';
import './App.css';

const Account = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        username: '',
        password: '',
    });

    const handleLogin = () => {

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: formData.username, password: formData.password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Login response:', data);
                if (data.code === 200) {
                    const userData = { username: formData.username, name: data.user.name };
                    onLogin(userData);
                    alert('Login successful');
                } else if (data.code === 401) {
                    alert('Invalid Credentials. Please try again')
                }
                else {
                    console.error('Login failed:', data.msg);
                    alert('Error logging into account');
                }
            })
            .catch(error => console.error('Error logging in:', error));
    };


    const handleSignup = () => {

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: formData.name, contact: formData.contact, username: formData.username, password: formData.password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 201) {
                    alert('Signup Successful')
                } else if (data.code === 409) {
                    alert('Username already exists. Please choose a different username.');
                }
                else {
                    console.error('Registration failed:', data.msg);
                }
            })
            .catch(error => console.error('Error registering:', error));
    };

    return (
        <div id="account" className="account">
            <div className="down">
                <h1>Happening Now</h1>
                <img src="logo.png" alt='logo' className="account-image" />
            </div>

            <div className="up">

                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                {isLogin ? (
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />) : (
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />)}

                {isLogin ? (
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Contact"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                )}

                {isLogin ? (
                    <button onClick={handleLogin}>Login</button>
                ) : (
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                )}

                {isLogin ? (
                    <p onClick={() => setIsLogin(!isLogin)}>
                        Create an account
                    </p>
                ) : (
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                )}

                {isLogin ? (<p></p>) : (
                    <button onClick={handleSignup}>Sign Up</button>
                )}

                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? '' : 'Already have an account?'}
                </p>

            </div>
        </div>
    );
};



export default Account;

