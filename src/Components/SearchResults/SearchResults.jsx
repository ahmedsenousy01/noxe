import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { endPoints, TMDB } from '../../apiRequests';
import { imageBaseURL } from '../Row/Row';

export default function SearchResults() {
	const [searchResults, setSearchResults] = useState([]);
	const { query } = useParams();

	useEffect(() => {
		(async () => {
			const { data } = await TMDB.get(endPoints.search + query);
			setSearchResults(data.results);
		})();
	}, []);

	return (
		<>
			<div className="container my-5">
				<div className="row mb-5 gy-4">
					{searchResults
						? searchResults
								.filter((movie) => movie.vote_average !== 0)
								.map((movie, index) => (
									<div
										className="col-md-2 position-relative"
										key={index}
									>
										<Link
											to={`/movieDetails/${movie.media_type}/${movie.id}`}
										>
											<div className="inner">
												<div className="rating position-absolute top-0 end-0 bg-info text-center">
													{Math.round(
														movie.vote_average * 10
													) / 10}
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
								))
						: ''}
				</div>
			</div>
		</>
	);
}
