import React from 'react';
import { endPoints } from '../../apiRequests';
import Banner from '../Banner/Banner';

export default function BannerSlider({apiKeyword}) {
	return (
		<>
			<div
				id="carouselExampleCaptions"
				className="carousel slide carousel-fade my-5"
				data-bs-ride="false"
			>
				<div className="carousel-inner rounded-2 w-75 mx-auto">
					{<Banner apiKeyword={apiKeyword} />}
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					/>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					/>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</>
	);
}
