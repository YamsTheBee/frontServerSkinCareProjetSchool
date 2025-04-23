import ProductCard from "../components/productscard/ProductCard";


export interface Product {
	id?: number;
	name: string;
	description: string;
	price: number;
	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
	product_url?: string;
}

const ProductPage = () => {
	// Exemple de produit fictif
	const fakeProduct: Product = {
		id: 1,
		name: "Crème hydratante",
		description: "Hydrate la peau en profondeur",
		price: 12.99,
		product_type: "hydratant",
		product_url: "creme.jpg", // Assure-toi que cette image est dans /public/images/
	};

	return (
		<div className="page">
			<ProductCard
				product={fakeProduct}
				onEdit={(product) => {
					console.log("Éditer produit :", product);
				}}
				onDelete={(id) => {
					console.log("Supprimer produit avec ID :", id);
				}}
			/>
			{/* <DetailProducts /> */}
		</div>
	);
};

export default ProductPage;
