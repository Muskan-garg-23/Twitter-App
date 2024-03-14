import React, { useState, useEffect } from "react";
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import { useNavigate } from "react-router-dom";
import { FaComment, FaRetweet, FaThumbsUp, FaShare, FaEllipsisH, FaEdit, FaTrash } from 'react-icons/fa';
import './App.css';

function Profile({ userData }) {

    const [posts, setPosts] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleToggleOptions = (postId) => {
        setShowOptions({
            ...showOptions,
            [postId]: !showOptions[postId]
        });
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    const fetchPosts = () => {
        fetch('http://localhost:3000/getPosts', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    setPosts(data.posts);
                } else {
                    console.error('Failed to fetch posts:', data);
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    };



    const handleLogout = () => {

        fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert('Logout successful');
                    navigate('/');
                } else {
                    console.error('Logout failed:', data.msg);
                }
            })
            .catch(error => console.error('Error logging out:', error));
    };


    const handleEdit = (postId) => {
        navigate('/editpost', { state: { post: posts.find(post => post._id === postId) } });
    };


    const handleDelete = (postId) => {
        fetch(`http://localhost:3000/deletePost/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert('Post deleted successfully!');
                    fetchPosts();
                } else {
                    console.error('Failed to delete post:', data);
                    alert('Error deleting post');
                }
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                alert('Error deleting post');
            });
    };

    return (
        <div>
            <Leftbar />
            <div id="profile" className="profile">
                <h2>Profile</h2>
                <div><hr /></div>
                <div className="profile-grey"></div>
                <div className="profile-two">
                    <img src="user.png" className="profile-img" alt="user" />
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="profile-three">
                    {userData && (
                        <div>
                            <h3>{userData.name}</h3>
                            <p>@{userData.username}</p>
                        </div>
                    )}
                </div>
                <div><hr /></div>
                <h2>Your posts:</h2>
                <div className="post-list">
                    {posts.map(post => (
                        <div key={post._id} className="single-post">
                            <div><hr /></div>
                            <div className="abc">
                                <div>
                                    <div className="abc1">
                                        <img src="user.png" alt="user"></img>
                                        <div className="abc2">
                                            <h3>{userData.name}</h3>
                                            <p>@{userData.username}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="post-title"><b>{post.title}</b></p>
                                        <p className="post-content">{post.content}</p>
                                    </div>
                                    <div>
                                        <div className="post-actions">
                                            <FaComment className="action comment" />
                                            <FaRetweet className="action" />
                                            <FaThumbsUp className="action" />
                                            <FaShare className="action" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post-options">
                                    <FaEllipsisH className="dots" onClick={() => handleToggleOptions(post._id)} />
                                    {showOptions[post._id] && (
                                        <div className="options-dropdown">
                                            <div className="option option-edit" onClick={() => handleEdit(post._id)}><FaEdit />&nbsp;&nbsp;Edit</div> <br />
                                            <div className="option option-delete" onClick={() => handleDelete(post._id)}><FaTrash />&nbsp;&nbsp;Delete</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <Rightbar />
        </div>
    )
}

export default Profile;