// FORMULAIRE ADD NEW PRODUCT
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

const DetailProducts: React.FC = () => {
	const [, setProducts] = useState<Product[]>([]);
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

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<ToastContainer />
			<h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
				Ajouter un nouveau produit
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
			-
		</div>
	);
};

export default DetailProducts;
