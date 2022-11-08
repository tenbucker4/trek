import React from 'react'
import NewPost from './NewPost';
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js';
import "../styles/feed.css";

const Feed = () => {
    
	return (
		<main>
			<div className='feed'>
				<NewPost />
				<div className='post'></div>
				<div className='post'></div>
				<div className='post'></div>
			</div>
			<aside>
				<div className='aside-container'>
					<div className='aside-background'></div>
					<div className='profile-picture'>
						<Icon path={mdiAccount}
						title="User Profile"
						size={1.5}
						color="black"/>
					</div>
					<h4 className='user-profile'>Ben Tucker</h4>
					<p className='user-bio'>Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Unde fugit tempore ea molestiae tenetur facere, ullam iusto. </p>
				</div>
			</aside>
		</main>
	)
}

export default Feed