import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function ForYou() {

    const navigate = useNavigate();
    const [Data, setData] = useState({
        title: '',
        content: '',
        image: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }


    const handlePost = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 201) {
                    alert('Post created successfully!');
                    navigate('/profile');
                }
                else {
                    console.error('Failed:', data.msg);
                    alert('Error creating post');
                }
            })
            .catch(error => console.error('Error creating post:', error));
    }

    return (
        <div className="for-you">
            <div className="post-form">
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={Data.title}
                    onChange={handleChange}
                    required
                />
                <hr className="divider" />
                <textarea
                    rows={5}
                    placeholder="What is happening?!"
                    name="content"
                    value={Data.content}
                    onChange={handleChange}
                    className="content-input"
                    required
                />
                <div className="post-div">
                    <input type="file" id="image-upload" accept="image/*" />
                    <button className="post-button" onClick={handlePost}>Post</button>
                </div>
            </div>

            <div className="for-you-two"><hr /></div>

        </div>
    )
}

export default ForYou;