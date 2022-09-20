import Joi from 'joi';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteAPI, RouteEndPoints } from '../../apiRequests';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

export default function Register() {
	const { decodeToken, currentUser } = useContext(CurrentUserContext);
	let navigate = useNavigate();
	const [joiErrors, setJoiErrors] = useState([]);
	const [apiErrors, setApiErrors] = useState('');
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		age: 0,
	});

	useEffect(() => {
		if (currentUser) {
			navigate('/home');
		}
	}, [currentUser]);

	async function register(e) {
		e.preventDefault();
		let joiResponse = validateForm();
		if (joiResponse.error) {
			setJoiErrors(joiResponse.error.details);
		} else {
			const { data } = await RouteAPI.post(RouteEndPoints.signup, user);
			if (data.message === 'success') {
				const response = await RouteAPI.post(
					RouteEndPoints.signin,
					user
				);
				localStorage.setItem('token', response.data.token);
				await decodeToken();
				navigate('/home');
			} else {
				setApiErrors(data.message);
			}
		}
	}

	function getValuefromInput(e) {
		let potentialUser = { ...user };
		potentialUser[e.target.name] = e.target.value;
		setUser(potentialUser);
	}

	function validateForm() {
		let schema = Joi.object({
			first_name: Joi.string().alphanum().min(3).max(10).required(),
			last_name: Joi.string().alphanum().min(3).max(10).required(),
			email: Joi.string()
				.email({
					minDomainSegments: 2,
					tlds: { allow: ['com', 'net'] },
				})
				.required(),
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
				.required(),
			age: Joi.number().min(16).max(60).required(),
		});
		return schema.validate(user, { abortEarly: false });
	}

	return (
		<>
			<div className="errors w-75 m-auto">
				{joiErrors.map((a, index) => (
					<div key={index} className="alert alert-danger">
						{a.message}
					</div>
				))}
				{apiErrors ? (
					<div className="alert alert-danger">{apiErrors}</div>
				) : (
					''
				)}
			</div>
			<div className="mt-5 d-flex flex-column justify-content-center align-items-center">
				<form onSubmit={register} className="w-75">
					<label htmlFor="first_name">First Name</label>
					<input
						onChange={getValuefromInput}
						name="first_name"
						className="form-control mb-3"
						type="text"
						id="first_name"
						placeholder="First Name"
					/>
					<label htmlFor="last_name">Last Name</label>
					<input
						onChange={getValuefromInput}
						name="last_name"
						className="form-control mb-3"
						type="text"
						id="last_name"
						placeholder="Last Name"
					/>
					<label htmlFor="age">Age</label>
					<input
						onChange={getValuefromInput}
						name="age"
						className="form-control mb-3"
						type="number"
						id="age"
						placeholder="Age"
					/>
					<label htmlFor="email">Email</label>
					<input
						onChange={getValuefromInput}
						name="email"
						className="form-control mb-3"
						type="email"
						id="email"
						placeholder="Email"
					/>
					<label htmlFor="password">Password</label>
					<input
						onChange={getValuefromInput}
						name="password"
						className="form-control mb-3"
						type="password"
						id="password"
						placeholder="Password"
					/>
					<button className="btn btn-info">Register</button>
				</form>
			</div>
		</>
	);
}
