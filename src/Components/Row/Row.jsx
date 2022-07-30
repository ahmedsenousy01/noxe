import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TMDB } from '../../apiRequests';
import './Row.css';

export let imageBaseURL = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, apiKeyWord, type, apiType }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		(async () => {
			let { data } = await TMDB.get(apiKeyWord);
			setMovies(data.results);
		})();

		return () => {};
	}, [apiKeyWord]);

	return (
		<>
			<div className="row mb-5 gy-4">
				<div className="col-md-4 title pt-5">
					<div className="inner d-flex flex-column">
						<div className="before-title"></div>
						<h2 className="w-50">{title}</h2>
						<p className="text-muted">
							Most watched {type} last week
						</p>
						<div className="after-title"></div>
					</div>
				</div>
				{movies
					.filter((elem, index) => index < 10)
					.map((movie, index) => (
						<div className="col-md-2 position-relative" key={index}>
							<Link to={`/movieDetails/${apiType}/${movie.id}`}>
								<div className="inner">
									<div className="rating position-absolute top-0 end-0 bg-info text-center">
										{Math.round(movie.vote_average * 10) /
											10}
									</div>
									<img
										src={`${imageBaseURL}${movie.poster_path}`}
										alt=" "
										className="w-100"
									/>
									{movie.title}
								</div>
							</Link>
						</div>
					))}
			</div>
		</>
	);
}
