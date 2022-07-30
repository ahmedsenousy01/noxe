import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import Search from '../Search/Search';

export default function Navbar() {

	const { logout, currentUser } = useContext(CurrentUserContext);

	return (
		<>
			<nav id='nav' className="navbar navbar-expand-lg navbar-dark bg-transparent">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Noxe
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						{!currentUser ? (
							<></>
						) : (
							<>
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<li className="nav-item">
										<Link className="nav-link" to="/home">
											Home
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/movies">
											Movies
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/tv">
											Tv
										</Link>
									</li>
								</ul>
							</>
						)}
						{!currentUser ? (
							''
						) : (
							<>
								<Search />
							</>
						)}
						<ul className={`navbar-nav ${currentUser? '' : 'ms-auto'} me-3 mb-2 mb-lg-0`}>
							<li className="nav-item me-3">
								<a href="https://github.com/ahmedsenousy01">
									<i className="fa-brands fa-github"></i>
								</a>
							</li>
							<li className="nav-item me-3">
								<a href="https://www.linkedin.com/in/ahmed-senousy-827005206/">
									<i className="fa-brands fa-linkedin"></i>
								</a>
							</li>
							<li className="nav-item me-3">
								<a href='mailto:ahmedsenousy01@gmail.com'>
									<i className="fa-brands fa-google"></i>
								</a>
							</li>
						</ul>
						<ul className="navbar-nav mb-2 mb-lg-0">
							{!currentUser ? (
								<>
									<li className="nav-item">
										<Link className="nav-link" to="/login">
											Login
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/register"
										>
											Register
										</Link>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<span
											onClick={logout}
											id="logout-btn"
											className="nav-link"
										>
											Logout
										</span>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
