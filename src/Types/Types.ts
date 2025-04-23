export interface Product {
	id?: number; // id est maintenant optionnel
	name: string;
	description: string;
	price: number;
	product_type: "nettoyant" | "hydratant" | "traitement" | "masque";
	product_url?: string; // optionnel
}
