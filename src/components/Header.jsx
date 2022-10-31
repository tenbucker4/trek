import React, { useContext } from 'react'
import Icon from '@mdi/react'
import { mdiImageFilterHdr } from '@mdi/js';
import { mdiHome } from '@mdi/js';
import { mdiMessageReplyText } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
import { AuthContext } from '../auth/AuthContext';
import { auth, db } from '../auth/firebase';
import { signOut } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "../styles/header.css";

const Header = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext)

	const handleSignOut = async () => {
		await updateDoc(doc(db, "users", auth.currentUser.uid), {
		  isOnline: false
		})
		await signOut(auth);
		navigate("/trek/auth");
	}

  	return (
		<header>
			<div className='header-app-title'>
				<Icon path={mdiImageFilterHdr}
				title="User Profile"
				size={2}
				color="rgb(54, 159, 89)"/>
			</div>
			<div className='search-bar'>
			<input placeholder='Search' type="text"></input>
			</div>
			<ul className='nav-links'>
				<li className='nav-link'>
					<Icon path={mdiHome}
					title="User Profile"
					size={1}
					color="grey"/>
					<p className='small grey'>Home</p>
				</li>
				<li className='nav-link'>
					<Icon path={mdiMessageReplyText}
					title="User Profile"
					size={1}
					color="grey"/>
					<p className='small grey'>Messages</p>
				</li>
				<li className='nav-link'>
					<Icon path={mdiAccount}
					title="User Profile"
					size={1}
					color="grey"/>
					<p className='small grey'>Profile</p>
				</li>
				<button onClick={handleSignOut}>Log Out</button>
			</ul>
		</header>
  	)
}

export default Header