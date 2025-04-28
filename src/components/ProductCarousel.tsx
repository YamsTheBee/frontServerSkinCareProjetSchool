import { useState, useEffect } from "react";
import "./ProductCarousel.css";

const images = [
	{
		id: "institut",
		url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
		alt: "Institut de beauté moderne",
	},
	{
		id: "soin-visage",
		url: "https://images.unsplash.com/photo-1522338140262-f46f5913618a",
		alt: "Soin du visage professionnel",
	},
	{
		id: "spa",
		url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
		alt: "Espace détente spa",
	},
	{
		id: "produits",
		url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
		alt: "Produits de beauté naturels",
	},
];

const ProductCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000); // Change d'image toutes les 5 secondes

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="carousel-container">
			{images.map((image) => (
				<div
					key={image.id}
					className={`carousel-slide ${
						images.indexOf(image) === currentIndex ? "active" : ""
					}`}
					style={{
						backgroundImage: `url(${image.url})`,
					}}
					role="img"
					aria-label={image.alt}
				/>
			))}
			<div className="carousel-overlay" />
		</div>
	);
};

export default ProductCarousel;
