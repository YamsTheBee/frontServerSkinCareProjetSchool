import type React from "react";
import "../productscard/ProductCard.css";
import type { Product } from "../../Types/Types"; // Ensure the path is correct

interface ProductCardProps {
	product: Product;
	onEdit: (product: Product) => void;
	onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onEdit,
	onDelete,
}) => {
	const handleDelete = (id: number) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
			onDelete(id);
		}
	};

	return (
		<div className="product-card">
			<div className="product-card__header">
				{product.product_url ? (
					<img
						src={product.product_url}
						// biome-ignore lint/a11y/noRedundantAlt: <explanation>
						alt={`Image du produit ${product.name}`}
						className="product-card__image"
					/>
				) : (
					<div className="product-card__image product-card__image--placeholder">
						<span>Pas d'image disponible</span>
					</div>
				)}
				<div className="product-card__type-badge">{product.product_type}</div>
			</div>

			<div className="product-card__content">
				<h3 className="product-card__name">{product.name}</h3>
				<p className="product-card__brand">{product.brand}</p>
				<p className="product-card__description">{product.description}</p>

				<div className="product-card__details">
					<p className="product-card__price">
						{new Intl.NumberFormat("fr-FR", {
							style: "currency",
							currency: "EUR",
						}).format(product.price)}
					</p>
					<p className="product-card__volume">{product.volume}</p>
				</div>

				<div className="product-card__skin-type">
					<span>Type de peau : {product.skin_type}</span>
				</div>

				<div className="product-card__contraindications">
					<span>Contre-indications : {product.contraindications}</span>
				</div>

				{product.rating && (
					<div className="product-card__rating">
						<span>Note : {product.rating}/5</span>
						{product.reviews && <span>({product.reviews} avis)</span>}
					</div>
				)}
			</div>

			<div className="product-card__buttons">
				<button
					type="button"
					onClick={() => onEdit(product)}
					className="product-card__button product-card__edit-button"
				>
					Modifier
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
