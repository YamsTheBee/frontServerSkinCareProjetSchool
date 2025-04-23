import type React from "react";
import "./ProductCard.css";

// Interface pour le type Product
interface ProductProps {
	id?: number;
	name: string;
	description: string;
	price: number;
	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
	product_url?: string; // URL de l'image
}

interface ProductCardProps {
	product: ProductProps;
	onEdit: (product: ProductProps) => void;
	onDelete: (id?: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onEdit,
	onDelete,
}) => {
	const handleDelete = (id?: number) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
			onDelete(id);
		}
	};

	return (
		<div className="product-card">
			{/* Affichage de l'image ou message si l'image est absente */}
			{product.product_url ? (
				<img
					src={product.product_url} // Utilise directement product.product_url
					// biome-ignore lint/a11y/noRedundantAlt: <explanation>
					alt={`Image du produit ${product.name}`}
					className="product-card__image"
				/>
			) : (
				<div className="product-card__image product-card__image--placeholder">
					<span className="text-white">Pas d'image disponible</span>
				</div>
			)}

			<h3 className="product-card__name">{product.name}</h3>
			<p className="product-card__description">{product.description}</p>
			<p className="product-card__price">
				{new Intl.NumberFormat("fr-FR", {
					style: "currency",
					currency: "EUR",
				}).format(product.price)}
			</p>
			<p className="product-card__type">{product.product_type}</p>

			<div className="product-card__buttons">
				<button
					type="button"
					onClick={() => onEdit(product)}
					className="product-card__button product-card__edit-button"
				>
					Éditer
				</button>
				<button
					type="button"
					onClick={() => handleDelete(product.id)}
					className="product-card__button product-card__delete-button"
				>
					Supprimer
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
