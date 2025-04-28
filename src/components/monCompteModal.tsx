import type React from "react";
import { useState } from "react";
import axios from "axios";
import RegisterForm from "./registerForm"; // Assure-toi d'importer correctement le composant
import "./monCompteModal.css";

interface MonCompteModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const MonCompteModal: React.FC<MonCompteModalProps> = ({ isOpen, onClose }) => {
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
			<div className="modal-container">
				<button type="button" className="modal-close-btn" onClick={onClose}>
					×
				</button>
				<h2 className="text-primary">Mon Compte</h2>
				{!isRegistering ? (
					<div className="modal-form">
						<input type="email" placeholder="Email" className="form-input" />
						<input
							type="password"
							placeholder="Mot de passe"
							className="form-input"
						/>
						<button type="submit" className="btn-primary">
							Se connecter
						</button>
						<button
							type="button"
							className="btn-secondary"
							onClick={() => setIsRegistering(true)}
						>
							Créer un compte
						</button>
					</div>
				) : (
					<RegisterForm />
				)}
			</div>
		</div>
	);
};

export default MonCompteModal;
