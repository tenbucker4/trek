import React from 'react'

const NewPost = () => {
  return (
    <div className='new-post-container'>
        <div className="profile-pic"></div>
        <div className="new-post-info">
            <textarea name="" id="" rows="5"></textarea>
            <input type="file" />
            <button>Post Trek</button>
        </div>
    </div>
  )
}

export default NewPost