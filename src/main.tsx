import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/home.tsx";
import MonCompte from "./pages/monCompte.tsx";
import MoncompteModal from "./components/monCompteModal.tsx";
import Welcome from "./components/welcome.tsx";
import UserForm from "./components/userForm.tsx";
import type { Product } from "./Types/Types.ts";
import ProductCard from "./components/productscard/ProductCard.tsx";
import DetailProducts from "./components/detailProducts.tsx";
import ProductPage from "./pages/products.tsx";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/mon-compte",
				element: <MonCompte />,
			},
			{
				path: "/welcome",
				element: <Welcome />,
			},
			{
				path: "/useForm",
				element: <UserForm />,
			},
			{
				path: "/productPage",
				element: <ProductPage />,
			},
			{
				path: "/detailproducts",
				element: <DetailProducts />,
			},
			{
				path: "/productcard",
				element: (
					<ProductCard
						product={{
							id: 1,
							name: "Crème Réparatrice Nuit",
							description:
								"Crème pour réduire les imperfections pendant la nuit et nourrir la peau.",
							price: 34.99,
							product_type: "traitement",
							product_url: "/images/creme-nuit.jpg", // Chemin correct de l'image
						}}
						onEdit={(product: Product): void => {
							console.log("Produit à éditer:", product);
						}}
						onDelete={(id?: number): void => {
							if (id !== undefined) {
								console.log("Produit supprimé avec id:", id);
							}
						}}
					/>
				),
			},
			{
				path: "/MoncompteModal",
				element: (
					<MoncompteModal
						isOpen={false}
						onClose={() => {
							console.log("Modal fermé");
						}}
					/>
				),
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
