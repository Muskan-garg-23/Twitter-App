import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

function EditPost() {

    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state;
    const [formData, setFormData] = useState({
        title: post.title,
        content: post.content
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChanges = (postId) => {
        const updatedPost = {
            title: formData.title,
            content: formData.content
        };

        fetch(`http://localhost:3000/editPost/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(updatedPost),
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert('Post updated successfully!');
                    navigate('/profile');
                } else {
                    console.error('Failed to update post:', data);
                    alert('Error updating post');
                }
            })
            .catch(error => {
                console.error('Error updating post:', error);
                alert('Error updating post');
            });
    };

    return (
        <div>
            <Leftbar />
            <div className="editPost">
                <h2>Edit Your Post</h2>
                <div className="edit-form">
                    <div className="edit-field">
                        <label htmlFor="title">Title:</label><br />
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="edit-field">
                        <label htmlFor="content">Content:</label><br />
                        <textarea
                            rows={5}
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button onClick={() => handleEditChanges(post._id)} className="post-button">Edit</button>
                </div>
            </div>
            <Rightbar />
        </div>
    )
}

export default EditPost;