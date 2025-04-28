import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "./productscard/ProductCard";
import { motion } from "framer-motion";

const ProductList = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

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
					Une erreur est survenue lors du chargement des produits
				</p>
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
			<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
				Nos Produits
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products?.map((product) => (
					<motion.div
						key={product.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<ProductCard
							product={product}
							onEdit={() => {}}
							onDelete={() => {}}
						/>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default ProductList;
