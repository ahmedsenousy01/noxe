import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, TMDB } from '../../apiRequests';
import { imageBaseURL } from '../Row/Row';

export default function MoviesOrShows({ apiType }) {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [nofPages, setNofPages] = useState(1);

	const apiLink = `/discover/${apiType}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;

	function increment() {
		if (page >= nofPages) return;
		setPage(page + 1);
	}

	function decrement() {
		if (page <= 1) return;
		setPage(page - 1);
	}

	useEffect(() => {
		(async () => {
			let { data } = await TMDB.get(apiLink);
			setMovies(data.results);
			setNofPages(data.total_pages);
		})();
	}, [page, apiLink]);

	return (
		<>
			<div className="container d-flex text-center justify-content-center align-items-center my-5">
				<button
					onClick={decrement}
					className="btn btn-info mx-3 text-white fw-bolder"
				>
					{'<<'}
				</button>
				<span>
					{' '}
					{page} / {nofPages}{' '}
				</span>
				<button
					onClick={increment}
					className="btn btn-info mx-3 text-white fw-bolder"
				>
					{'>>'}
				</button>
			</div>
			<div className="container">
				<div className="row mb-5 gy-4">
					{movies.map((movie, index) => (
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
									{apiType === 'tv'
										? movie.name
										: movie.title}
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
