import { useState } from "react";
import axios from "axios";

const UserForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	// Validation simple du formulaire
	const validateForm = () => {
		if (!username || !email || !password) {
			return "Tous les champs sont requis.";
		}
		// Validation de l'email
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(email)) {
			return "L'adresse email est invalide.";
		}
		return "";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation avant l'envoi
		const validationError = validateForm();
		if (validationError) {
			setErrorMessage(validationError);
			return;
		}

		setIsSubmitting(true);
		setErrorMessage(""); // Réinitialiser les messages d'erreur

		try {
			const response = await axios.post(
				"http://localhost:4242/api/users/register",
				{
					username,
					email,
					password,
				},
			);

			if (response.data?.error) {
				setErrorMessage(response.data.error); // Affiche les erreurs spécifiques du serveur
			} else {
				setSuccessMessage("Inscription réussie !");
				// Réinitialisation du formulaire
				setUsername("");
				setEmail("");
				setPassword("");
			}

			console.log("Utilisateur créé", response.data);
		} catch (err) {
			setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
			console.error("Erreur lors de l'inscription", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<h2>Formulaire d'inscription</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Nom d'utilisateur :</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						aria-label="Nom d'utilisateur"
					/>
				</div>
				<div>
					<label htmlFor="email">Email :</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						aria-label="Email"
					/>
				</div>
				<div>
					<label htmlFor="password">Mot de passe :</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						aria-label="Mot de passe"
					/>
				</div>
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "En cours..." : "S'inscrire"}
				</button>
			</form>

			{/* Affichage des messages d'erreur ou de succès */}
			{errorMessage && <div className="error-message">{errorMessage}</div>}
			{successMessage && (
				<div className="success-message">{successMessage}</div>
			)}
		</div>
	);
};

export default UserForm;
