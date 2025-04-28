export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
	product_url?: string;
	skin_type: "sèche" | "grasse" | "mixte" | "sensible" | "normale";
	ingredients: string[];
	benefits: string[];
	usage_instructions: string;
	volume: string;
	brand: string;
	rating?: number;
	reviews?: number;
}

export interface ProductFormData extends Omit<Product, "id"> {}
