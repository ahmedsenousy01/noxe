import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export const CurrentUserContext = React.createContext();

export default function CurrentUserContextProvider(props) {
	const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

	function logout() {
		localStorage.removeItem('token');
		setCurrentUser(null);
		navigate('/login');
	}

	function decodeToken() {
		let user = jwtDecode(localStorage.getItem('token'));
		setCurrentUser(user);
	}

	return (
		<CurrentUserContext.Provider value={{ currentUser, logout, decodeToken }}>
			{props.children}
		</CurrentUserContext.Provider>
	);
}
