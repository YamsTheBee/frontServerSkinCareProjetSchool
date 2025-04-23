// import ProductCard from "../components/productscard/ProductCard";

// export interface Product {
// 	id?: number;
// 	name: string;
// 	description: string;
// 	price: number;
// 	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
// 	product_url?: string;
// }

// const ProductPage = () => {
// 	// Exemple de produit fictif
// 	const fakeProduct: Product = {
// 		id: 1,
// 		name: "Crème hydratante",
// 		description: "Hydrate la peau en profondeur",
// 		price: 12.99,
// 		product_type: "hydratant",
// 		product_url: "public/images/gel-nettoyant-apaisant.jpg", // Assure-toi que cette image est dans /public/images/
// 	};

// 	return (
// 		<div className="page">
// 			<ProductCard
// 				product={fakeProduct}
// 				onEdit={(product) => {
// 					console.log("Éditer produit :", product);
// 				}}
// 				onDelete={(id) => {
// 					console.log("Supprimer produit avec ID :", id);
// 				}}
// 			/>
// 		</div>
// 	);
// };

// export default ProductPage;
import { useEffect, useState } from "react";
import ProductCard from "../components/productscard/ProductCard";
import type { Product } from "../Types/Types"; // ou redéfinir l'interface ici

const ProductPage = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetch("http://localhost:4242/api/products") // Notez le /api/products ici
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => {
				console.error("Erreur de chargement des produits :", err);
			});
	}, []);

	return (
		<div className="product-grid">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					onEdit={(p) => console.log("Éditer :", p)}
					onDelete={(id) => console.log("Supprimer ID :", id)}
				/>
			))}
		</div>
	);
};

export default ProductPage;
