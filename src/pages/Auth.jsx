import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Icon from '@mdi/react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore"
import { auth, db} from '../auth/firebase';
import { mdiImageFilterHdr } from '@mdi/js';

const Auth = () => {
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false)

	const initState = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		error: null,
		loading: false
	}
	
	const [userData, setUserData] = useState(initState)
	const { name, email, password, confirmPassword, error, loading } = userData;

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUserData({ ...userData, error: null, loading: true });
		
		if (isSignUp) {
			if (!name || !email || !password || !confirmPassword) {
				return setUserData({ ...userData, error: "Please fill in all fields" });
			  }
			  if (password !== confirmPassword) {
				return setUserData({ ...userData, error: "Passwords do not match"})
			  }
		  
			  try {
				const result = await createUserWithEmailAndPassword(
				  auth,
				  email,
				  password
				)
		  
				await setDoc(doc(db, "users", result.user.uid), {
				  uid: result.user.uid,
				  name,
				  email,
				  createdAt: Timestamp.fromDate(new Date()),
				  isOnline: false,
				})
		  
				setUserData(initState);
		  
				window.location.reload(true);
		  
			  } catch (err) {
				setUserData({ ...userData, error: err.message, loading: false });
			  }
		} else {
			try {
				const result = await signInWithEmailAndPassword(auth, email, password);
		  
				await updateDoc(doc(db, "users", result.user.uid), {
				  isOnline: true
				});
		  
				setUserData({initState});
		  
				navigate("/trek/home");
		  
			  } catch (error) {
				setUserData({ ...userData, error: error.message, loading: false });
			  }
		}
	}


  	return (
		<div className='auth-page'>
			<div className="auth-container">
				<div className='app-header'>
					<div className='app-title'>
						<div className='green'>Trek</div>
						<Icon path={mdiImageFilterHdr}
						title="User Profile"
						size={4}
						color="rgb(54, 159, 89)"/>
					</div>
					<h3 className='grey'>Share your outdoor adventures with your network.</h3>
				</div>
				<div className='auth-form-container'>
					<div className='auth-form'>
						<form onSubmit={handleSubmit} autoComplete="off">
							{isSignUp? 
								<>
									<div className='form-entry'>
										<input name="name" className="form-input" id="name" placeholder=' ' type="text" defaultValue={name} onChange={handleChange} />
										<label className="form-label" htmlFor="name">Name</label>
									</div>
									<div className='form-entry'>
										<input placeholder=' ' name="email" className="form-input" id="email" type="email" defaultValue={email} onChange={handleChange}/>
										<label className="form-label" htmlFor="email">Email</label>
									</div>
									<div className='form-entry'>
										<input name="password" className='form-input' placeholder=' ' type="password" id="password" defaultValue={password} onChange={handleChange}/>
										<label className='form-label' htmlFor="password">Password</label>
									</div>
									<div className='form-entry'>
										<input name="confirmPassword" className='form-input' id="confirmPassword" placeholder=' ' type="password" defaultValue={confirmPassword} onChange={handleChange}/>
										<label className='form-label' htmlFor="confirmPassword">Confirm Password</label>
									</div>
									{error? <p style={{ color: "black", fontSize: "12px" }}>{error}</p> : null}
									{loading? <p style={{ color: "black", fontSize: "12px" }}>Processing...</p> : null}
									<button type='submit'>Register</button>
								</>
								: 
								<>
									<div className='form-entry'>
										<input name="email" placeholder=' ' className="form-input" id="email" type="email" defaultValue={email} onChange={handleChange}/>
										<label className="form-label" htmlFor="email">Email</label>
									</div>
									<div className='form-entry'>
										<input name="password" className='form-input' placeholder=' ' type="password" id="password" defaultValue={password} onChange={handleChange}/>
										<label className='form-label' htmlFor="password">Password</label>
									</div>
									{error? <p style={{ color: "black", fontSize: "12px" }}>{error}</p> : null}
									{loading? <p style={{ color: "black", fontSize: "12px" }}>Processing...</p> : null}
									<button type='submit'>Log In</button>
								</>
							}
						</form>
						{isSignUp? <p className='auth-footer'>Already have an account? <span onClick={() => setIsSignUp(prev => !prev)}>Sign In</span></p>
						: <p className='auth-footer'>Need an account? <span onClick={() => setIsSignUp(prev => !prev)}>Sign Up</span></p>}
					</div>
				</div>
			</div>
		</div>
    )
}

export default Auth