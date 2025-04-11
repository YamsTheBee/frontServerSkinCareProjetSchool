import type React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
	id?: number;
	name: string;
	description: string;
	price: number;
	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
	product_url?: string;
}

const initialForm: Product = {
	name: "",
	description: "",
	price: 0,
	product_type: "nettoyant",
	product_url: "",
};

const Products: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [form, setForm] = useState<Product>(initialForm);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const res = await fetch("http://localhost:4242/api/products");
		const data = await res.json();
		setProducts(data);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: name === "price" ? Number.parseFloat(value) : value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const method = isEditing ? "PUT" : "POST";
		const url = isEditing
			? `http://localhost:4242/api/products/${form.id}`
			: "http://localhost:4242/api/products";

		const res = await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});

		const responseData = await res.json();
		console.log(responseData);

		if (res.ok) {
			toast.success(isEditing ? "Produit modifié !" : "Produit ajouté !");
			setForm(initialForm);
			setIsEditing(false);
			fetchProducts();
		} else {
			toast.error("Une erreur est survenue.");
		}
	};

	const handleEdit = (product: Product) => {
		setForm(product);
		setIsEditing(true);
	};

	const handleDelete = async (id?: number) => {
		if (!id) return;
		const res = await fetch(`http://localhost:4242/api/products/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			toast.info("Produit supprimé.");
			fetchProducts();
		} else {
			toast.error("Erreur lors de la suppression.");
		}
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<ToastContainer />
			<h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
				Ajouter ou modifier un produit
			</h1>

			<form
				onSubmit={handleSubmit}
				className="space-y-4 bg-white p-6 rounded-xl shadow-md"
			>
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Nom"
					className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
					required
				/>
				<textarea
					name="description"
					value={form.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
				/>
				<input
					type="number"
					name="price"
					value={form.price}
					onChange={handleChange}
					placeholder="Prix"
					className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
					required
				/>

				<select
					name="product_type"
					value={form.product_type}
					onChange={handleChange}
					className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
				>
					<option value="nettoyant">Nettoyant</option>
					<option value="hydratant">Hydratant</option>
					<option value="traitement">Traitement</option>
					<option value="masque">Masque</option>
				</select>

				<input
					name="product_url"
					value={form.product_url}
					onChange={handleChange}
					placeholder="Image URL"
					className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
				/>

				<button
					type="submit"
					className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
				>
					{isEditing ? "Modifier le produit" : "Ajouter le produit"}
				</button>
			</form>

			<div className="product-list mt-8">
				<h2 className="text-xl font-semibold mb-4">Liste des produits</h2>
				{products.map((prod) => (
					<div
						key={prod.id}
						className="product-item flex justify-between items-center p-3 border-b"
					>
						<div>
							<p className="font-semibold">{prod.name}</p>
							<p className="text-sm text-gray-600">{prod.description}</p>
						</div>
						<div className="actions space-x-2">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => handleEdit(prod)}
								className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
							>
								Éditer
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => handleDelete(prod.id)}
								className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
							>
								Supprimer
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
