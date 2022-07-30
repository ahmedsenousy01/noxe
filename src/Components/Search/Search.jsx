import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endPoints, TMDB } from '../../apiRequests';

export default function Search() {
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	async function search(e) {
		e.preventDefault();
		const searchInput = document.querySelector('#search-box');
		const query = searchInput.value;
		searchInput.value = '';
		navigate('/search/' + query);
		const { data } = await TMDB.get(endPoints.search + query);
		setSearchResults(data.results);
		console.log(searchResults);
	}

	return (
		<>
			<form
				onSubmit={search}
				className="d-flex ms-auto me-3"
				role="search"
			>
				<input
					id="search-box"
					className="form-control me-2"
					type="search"
					placeholder="Search"
					aria-label="Search"
				/>
				<button className="btn btn-outline-success">
					<i className="fa-solid fa-magnifying-glass"></i>
				</button>
			</form>
		</>
	);
}
