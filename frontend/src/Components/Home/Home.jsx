import React from 'react';
import { endPoints } from '../../apiRequests';
import BannerSlider from '../BannerSlider/BannerSlider';
import Row from '../Row/Row';

export default function Home() {
	return (
		<>
			<div className="container">
				<BannerSlider apiKeyword={endPoints.MoviesBanner} />
				<Row
					title={`Trending Movies to Watch Now`}
					apiKeyWord={endPoints.trendingMovies}
					type="movies"
					apiType="movie"
				/>
				<Row
					title="Trending Shows to Watch Now"
					apiKeyWord={endPoints.trendingShows}
					type="shows"
					apiType="tv"
				/>
			</div>
		</>
	);
}
