const API_URL = "http://localhost:4242/api";

export const getProducts = async () => {
	try {
		const response = await fetch(`${API_URL}/products`);
		if (!response.ok) {
			throw new Error("Erreur lors de la récupération des produits");
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};

export const getProductById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/products/${id}`);
		if (!response.ok) {
			throw new Error("Erreur lors de la récupération du produit");
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};

export const createProduct = async (product) => {
	try {
		const response = await fetch(`${API_URL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		});
		if (!response.ok) {
			throw new Error("Erreur lors de la création du produit");
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};

export const updateProduct = async (id, product) => {
	try {
		const response = await fetch(`${API_URL}/products/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		});
		if (!response.ok) {
			throw new Error("Erreur lors de la mise à jour du produit");
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await fetch(`${API_URL}/products/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Erreur lors de la suppression du produit");
		}
		return await response.json();
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};
