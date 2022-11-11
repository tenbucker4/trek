import React from 'react'
import "../styles/newPost.css"

const NewPost = ({ post, setPost, postImg, setPostImg }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='new-post-container'>
            <div className="new-post-left">
                <div className="avatar"></div>
            </div>
            <div className="new-post-right">
                <form onSubmit={handleSubmit}>
                    <textarea name="" id="" rows="5"></textarea>
                    <input type="file" />
                    <button>Post Trek</button>
                </form>
            </div>
        </div>
    )
}

export default NewPost