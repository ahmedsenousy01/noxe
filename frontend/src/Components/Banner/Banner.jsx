import React, { useEffect, useState } from 'react';
import { TMDB } from '../../apiRequests';
import './Banner.css';

export default function Banner({ apiKeyword }) {
	const [movies, setMovies] = useState([]);

	let imageBaseURL = 'https://image.tmdb.org/t/p/original';

	useEffect(() => {
		(async () => {
			let { data } = await TMDB.get(apiKeyword);
			setMovies(data.results);
		})();
	}, []);

	return (
		<>
			{movies
				.map((movie, index) => (
					<div key={index} className={`carousel-item ${index < 1? 'active' : ''}`}>
						<img
							src={`${imageBaseURL}${movie.backdrop_path}`}
							className="d-block w-100"
							alt="..."
						/>
						<div className="carousel-caption d-none d-md-block">
							<h5 className='fs-3 fw-bold'>{movie.title}</h5>
						</div>
					</div>
				))}
		</>
	);
}
