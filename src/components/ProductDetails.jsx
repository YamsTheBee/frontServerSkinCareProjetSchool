import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
	const { id } = useParams();
	const { addToCart } = useCart();
	const { user } = useAuth();
	const [quantity, setQuantity] = useState(1);

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductById(id),
	});

	const handleAddToCart = () => {
		if (!user) {
			toast.error(
				"Veuillez vous connecter pour ajouter des produits au panier",
			);
			return;
		}
		addToCart({ ...product, quantity });
		toast.success("Produit ajouté au panier avec succès");
	};

	if (isLoading) {
		return (
			<div
				className="flex justify-center items-center min-h-screen"
			>
				<div 
					role="status"
					aria-label="Chargement en cours"
					className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
				/>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-10" role="alert">
				<p className="text-red-600">
					Une erreur est survenue lors du chargement du produit
				</p>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="text-center py-10" role="alert">
				<p>Produit non trouvé</p>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
		>
			<div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
				{/* Image Gallery */}
				<div className="lg:max-w-lg lg:self-end">
					<div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
						<img
							src={product.image}
							alt={`${product.name} - Produit de beauté`}
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>

				{/* Product Info */}
				<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
					<h1
						className="text-3xl font-extrabold tracking-tight text-gray-900"
						id="product-name"
					>
						{product.name}
					</h1>

					<div className="mt-3">
						<h2 className="sr-only">Informations sur le produit</h2>
						<p
							className="text-3xl text-gray-900"
							aria-label={`Prix: ${product.price}€`}
						>
							{product.price}€
						</p>
					</div>

					<div className="mt-6">
						<h3 className="sr-only">Description</h3>
						<div
							className="text-base text-gray-700 space-y-6"
							aria-label="Description du produit"
						>
							{product.description}
						</div>
					</div>

					<div className="mt-6">
						<div className="flex items-center">
							<label
								htmlFor="quantity"
								className="mr-4 text-sm font-medium text-gray-700"
							>
								Quantité
							</label>
							<select
								id="quantity"
								name="quantity"
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								aria-label="Sélectionner la quantité"
							>
								{[1, 2, 3, 4, 5].map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="mt-10 flex">
						<button
							type="button"
							onClick={handleAddToCart}
							className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full"
							aria-label={`Ajouter ${quantity} ${product.name} au panier`}
						>
							Ajouter au panier
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetails;
