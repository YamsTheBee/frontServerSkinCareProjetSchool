import type React from "react";
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		age: "",
		city: "",
		country: "",
		skintype: "",
		profile_image_url: "",
	});

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setMessage("");

		try {
			const response = await axios.post(
				"http://localhost:4242/api/users/register",
				formData,
				{ withCredentials: true }, // Ajouter cette ligne pour permettre les cookies
			);
			console.log(response.data); // par exemple, tu pourrais afficher "Utilisateur enregistré !
			setMessage("Compte créé avec succès 🎉");
			setFormData({
				username: "",
				email: "",
				password: "",
				firstname: "",
				lastname: "",
				age: "",
				city: "",
				country: "",
				skintype: "",
				profile_image_url: "",
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			console.error(err);
			setError(
				err.response?.data || "Une erreur est survenue lors de l’inscription.",
			);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
			<h2 className="text-2xl font-semibold mb-4">Créer un compte</h2>
			{message && <p className="text-green-600">{message}</p>}
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
				{/* <input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
					className="input"
					required
				/> */}
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					className="input"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Mot de passe"
					value={formData.password}
					onChange={handleChange}
					className="input"
					required
				/>
				<input
					type="text"
					name="firstname"
					placeholder="Prénom"
					value={formData.firstname}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="lastname"
					placeholder="Nom"
					value={formData.lastname}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="number"
					name="age"
					placeholder="Âge"
					value={formData.age}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="city"
					placeholder="Ville"
					value={formData.city}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="country"
					placeholder="Pays"
					value={formData.country}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="skintype"
					placeholder="Type de peau"
					value={formData.skintype}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="profile_image_url"
					placeholder="Image de profil (URL)"
					value={formData.profile_image_url}
					onChange={handleChange}
					className="input"
				/>

				<button
					type="submit"
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
				>
					S'inscrire
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
