import type React from "react";
import { useState } from "react";
import axios from "axios";
import RegisterForm from "./registerForm"; // Assure-toi d'importer correctement le composant
import "./monCompteModal.css";

interface MonCompteModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const MoncompteModal: React.FC<MonCompteModalProps> = ({ isOpen, onClose }) => {
	const [isRegistering, setIsRegistering] = useState(false); // Pour basculer entre connexion et inscription
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	// Ne pas afficher le modal si isOpen est false
	if (!isOpen) return null;

	const validateForm = () => {
		if (!email || !password) {
			return "Tous les champs sont requis.";
		}
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(email)) {
			return "L'adresse email est invalide.";
		}
		return "";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationError = validateForm();
		if (validationError) {
			setErrorMessage(validationError);
			return;
		}

		setIsSubmitting(true);
		setErrorMessage("");

		try {
			const response = await axios.post(
				"http://localhost:4242/api/users/register",
				{ email, password },
			);

			if (response.data?.error) {
				setErrorMessage(response.data.error);
			} else {
				setSuccessMessage("Connexion réussie !");
				setEmail("");
				setPassword("");
			}
			console.log("Utilisateur créé", response.data);
		} catch (err) {
			setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
			console.error("Erreur lors de la connexion", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-form">
				<h2>{isRegistering ? "Créer un compte" : "Se connecter"}</h2>

				{/* Afficher soit le formulaire d'inscription, soit de connexion */}
				{isRegistering ? (
					<RegisterForm />
				) : (
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email">Votre email* :</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								aria-label="Email"
							/>
						</div>

						<label htmlFor="password">Mot de passe :</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							aria-label="Mot de passe"
						/>

						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#">Mot de passe oublié ?</a>

						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Connexion..." : "Se connecter"}
						</button>

						<div>
							<p>Vous n'avez pas encore de compte ?</p>
						</div>

						{/* Bouton pour basculer vers l'inscription */}
						<button type="button" onClick={() => setIsRegistering(true)}>
							Créer mon compte
						</button>
					</form>
				)}

				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				{successMessage && <p className="text-green-500">{successMessage}</p>}
			</div>
		</div>
	);
};

export default MoncompteModal;
