import ReactDOM from "react-dom/client";
// https://wildcodeschool.github.io/workshop-react-router/
import { createBrowserRouter, RouterProvider } from "react-router";
import axios from "axios";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/home.tsx";
import Products from "./components/productsDetails.tsx";
import UserForm from "./components/userForm.tsx";

const getData = async (linkToFetch: string) => {
	const result = await axios.get(linkToFetch);
	return result;
};

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/products",
				element: <Products />,
				loader: () => {
					return getData("http://localhost:4242/api/products/");
				},
			},
			{
				path: "userForm",
				element: <UserForm />,
			},
		],
	},
]);
// rendering
const rootElement = document.getElementById("root");
if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
