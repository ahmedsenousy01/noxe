import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, TMDB } from '../../apiRequests';
import { imageBaseURL } from '../Row/Row';

export default function MovieDetails() {
	const [movieDetails, setMovieDetails] = useState({});
	const [movieTrailer, setMovieTrailer] = useState([]);
	const [movieCast, setMovieCast] = useState([]);
	const { id, type } = useParams();
	const movieDetailsEndpoint = `/${type}/${id}?api_key=${API_KEY}&language=en-US`;
	const movieTrailerEndpoint = `/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
	const movieCastEndpoint = `/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`;

	useEffect(() => {
		(async () => {
			const { data } = await TMDB.get(movieDetailsEndpoint);
			setMovieDetails(data);
			console.log(data);
		})();
		(async () => {
			const { data } = await TMDB.get(movieTrailerEndpoint);
			setMovieTrailer(data.results);
			console.log(movieTrailer);
		})();
		(async () => {
			const { data } = await TMDB.get(movieCastEndpoint);
			setMovieCast(data.cast);
		})();
	}, []);

	return (
		<>
			<div className="container pt-5">
				<div className="row">
					<div className="col-md-4">
						<img
							src={`${imageBaseURL + movieDetails.poster_path}`}
							alt="movie poster"
							className="w-100 rounded-3 border border-1 border-white"
						/>
					</div>
					<div className="col-md-8 pt-4 px-5">
						<div className="inner">
							<h2>{movieDetails.original_title?movieDetails.original_title:movieDetails.name}</h2>
							<h4 className="text-muted mb-4">
								{movieDetails.tagline}
							</h4>
							{movieDetails.genres?.map((genre, index) => (
								<span
									key={index}
									className="p-2 bg-info mx-2 rounded-2"
								>
									{genre.name}
								</span>
							))}
							<h5 className="my-4">
								vote count: {movieDetails.vote_count}
							</h5>
							<h5 className="mb-4">
								vote average: {movieDetails.vote_average}
							</h5>
							<h5 className="mb-4">
								popularity: {movieDetails.popularity}
							</h5>
							<h5 className="mb-4">
								release date: {movieDetails.release_date}
							</h5>
							<p className="text-muted">
								{movieDetails.overview}
							</p>
							<div className="d-flex justify-content-around align-items-center text-center flex-wrap">
								{movieCast
									?.filter(
										(e, i) =>
											e.known_for_department ===
												'Acting' && i < 5
									)
									.map((actor, index) => (
										<div>
											<div
												key={index}
												style={{
													backgroundImage: `url(${`${imageBaseURL}${actor.profile_path}`})`,
													backgroundSize: 'cover',
													backgroundPosition:
														'center',
													height: '20vh',
													width: '20vh',
												}}
												className="rounded-circle"
											></div>
											<span>{actor.name}</span>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className="trailer my-5 mx-auto w-75">
					<h4>Latest Trailer</h4>
					<iframe
						title="trailer"
						src={`https://www.youtube.com/embed/${movieTrailer[1]?.key}`}
						frameborder="0"
						width="100%"
						height="500"
						className="mx-auto"
					></iframe>
				</div>
			</div>
		</>
	);
}
