import React, { useState, useContext, useEffect } from 'react'
import AuthContext from "../auth/AuthContext"
import { db, auth, storage } from "../auth/firebase"
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import NewPost from './NewPost';
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js';
import "../styles/feed.css";

const Feed = () => {
	const user = useContext(AuthContext);
	console.log(user);

	const [post, setPost] = useState("");
	const [postImg, setPostImg] = useState();
	const [profile, setProfile] = useState("");

	// useEffect(() => {
	// 	if (user) {
	// 	  getDoc(doc(db, "users", auth?.currentUser?.uid)).then(docSnap => {
	// 	  if (docSnap.exists) {
	// 		setProfile(docSnap.data());
	// 		console.log("update")
	// 	  }
	// 	})
	// 	}
	//   })


	// const currentUser = auth?.currentUser?.uid;

	// console.log(currentUser);
    
	return (
		<main>
			<div className='feed'>
				<NewPost post={post} setPost={setPost} postImg={postImg} setPostImg={setPostImg}/>
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