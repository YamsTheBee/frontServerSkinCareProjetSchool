import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./registerForm.css";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		phone: "",
		password: "",
		birthDate: "",
		newsletter: false,
		terms: false,
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
		setError(""); // Réinitialise l'erreur à chaque changement
	};

	const validateForm = () => {
		if (
			!formData.email ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.phone ||
			!formData.password ||
			!formData.birthDate
		) {
			setError("Tous les champs sont obligatoires.");
			return false;
		}

		// Validation email
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(formData.email)) {
			setError("L'email n'est pas valide.");
			return false;
		}

		// Validation téléphone (format français par exemple)
		const phonePattern = /^[0-9]{10}$/;
		if (!phonePattern.test(formData.phone)) {
			setError("Le numéro de téléphone n'est pas valide.");
			return false;
		}

		// Validation mot de passe (au moins 6 caractères, incluant majuscule, minuscule, chiffre)
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
		if (!passwordPattern.test(formData.password)) {
			setError(
				"Le mot de passe doit contenir au moins 6 caractères, dont une majuscule, une minuscule et un chiffre.",
			);
			return false;
		}

		// Validation des conditions d'utilisation
		if (!formData.terms) {
			setError("Vous devez accepter les conditions d'utilisation.");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			const response = await fetch("http://localhost:4242/api/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include", // Ajoute cette ligne pour envoyer des cookies si nécessaire
			});

			if (response.ok) {
				setSuccess("Inscription réussie !");
				setError("");
				toast.success("Inscription réussie !");
				setTimeout(() => setSuccess(""), 5000); // Réinitialisation après 5 secondes
			} else {
				const data = await response.json();
				setError(data.message || "Erreur lors de l'inscription");
				toast.error(data.message || "Erreur lors de l'inscription");
			}
		} catch (err) {
			setError("Erreur de connexion au serveur");
			toast.error("Erreur de connexion au serveur");
		}
	};

	return (
		<div className="form-container">
			<h2 className="text-primary">Créer un compte</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email"
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						placeholder="Prénom"
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						placeholder="Nom"
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Téléphone"
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Mot de passe"
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="date"
						name="birthDate"
						value={formData.birthDate}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="newsletter"
							checked={formData.newsletter}
							onChange={handleChange}
						/>
						Je souhaite recevoir la newsletter
					</label>
				</div>
				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="terms"
							checked={formData.terms}
							onChange={handleChange}
							required
						/>
						J'accepte les conditions d'utilisation
					</label>
				</div>
				{error && <div className="error-message">{error}</div>}
				{success && <div className="success-message">{success}</div>}
				<button type="submit" className="btn-primary">
					S'inscrire
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};

export default RegisterForm;
