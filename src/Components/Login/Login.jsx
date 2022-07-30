import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RouteAPI, RouteEndPoints } from '../../apiRequests';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

export default function Login() {

	const { decodeToken } = useContext(CurrentUserContext);

  let navigate = useNavigate();
	const [joiErrors, setJoiErrors] = useState([]);
	const [apiErrors, setApiErrors] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	async function login(e) {
		e.preventDefault();
		let joiResponse = validateForm();
		if (joiResponse.error) {
			setJoiErrors(joiResponse.error.details);
		} else {
			const {data} = await RouteAPI.post(RouteEndPoints.signin, user);
			if(data.message === 'success') {
        localStorage.setItem('token', data.token);
				decodeToken();
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
			email: Joi.string()
				.email({
					minDomainSegments: 2,
					tlds: { allow: ['com', 'net'] },
				})
				.required(),
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
				.required(),
		});
		return schema.validate(user, { abortEarly: false });
	}

	return 		<>
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
				<form onSubmit={login} className="w-75">
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
					<button className="btn btn-info">Login</button>
				</form>
			</div>
		</>
}
