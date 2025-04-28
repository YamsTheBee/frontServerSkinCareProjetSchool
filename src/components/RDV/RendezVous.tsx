import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import "./RendezVous.css";

interface RendezVous {
	id: number;
	user_id: number;
	date_heure: string;
	motif: string;
	description: string;
	created_at: string;
}

interface FormState {
	date_heure: string;
	motif: string;
	description: string;
}

interface RendezVousProps {
	onBack: () => void;
}

function RendezVous({ onBack }: RendezVousProps) {
	const [appointments, setAppointments] = useState<RendezVous[]>([]);
	const [form, setForm] = useState<FormState>({
		date_heure: "",
		motif: "",
		description: "",
	});
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // État pour la modal
	const userId = 1; // Remplacez par l'ID de l'utilisateur actuel

	useEffect(() => {
		fetchAppointments();
	}, []);

	const fetchAppointments = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:4242/api/rendezvous/${userId}`,
			);
			setAppointments(response.data);
		} catch (error) {
			console.error(error);
			toast.error("Erreur lors du chargement des rendez-vous.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm((prevForm) => ({
			...prevForm,
			[e.target.name]: e.target.value || "", // Garantir que la valeur est toujours une chaîne vide si undefined
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (!form.date_heure || !form.motif || !form.description) {
			toast.error("Tous les champs doivent être remplis.");
			setLoading(false);
			return;
		}

		try {
			const formattedDate = new Date(form.date_heure)
				.toISOString()
				.slice(0, 19)
				.replace("T", " ");

			const dataToSend = {
				...form,
				date_heure: formattedDate,
				user_id: userId,
			};

			console.log("Data to send:", dataToSend);

			if (editIndex !== null) {
				await axios.put(
					`http://localhost:4242/api/rendezvous/${appointments[editIndex].id}`,
					dataToSend,
				);
				toast.success("Rendez-vous modifié avec succès !");
				setAppointments((prev) =>
					prev.map((appointment, index) =>
						index === editIndex
							? { ...appointment, ...dataToSend }
							: appointment,
					),
				);
			} else {
				const response = await axios.post(
					"http://localhost:4242/api/rendezvous",
					dataToSend,
				);
				toast.success("Rendez-vous ajouté avec succès !");
				setAppointments((prev) => [...prev, response.data]);
			}

			setForm({ date_heure: "", motif: "", description: "" });
			setEditIndex(null);
			setIsModalOpen(false); // Fermer la modal

			setTimeout(() => {
				onBack();
			}, 2000);
		} catch (error) {
			console.error("Erreur:", error);
			if (axios.isAxiosError(error)) {
				console.error("Axios error:", error.response?.data || error.message);
			}
			toast.error("Erreur lors de l'envoi du formulaire.");
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (index: number) => {
		setForm({
			date_heure: appointments[index].date_heure,
			motif: appointments[index].motif,
			description: appointments[index].description,
		});
		setEditIndex(index);
	};

	const handleDelete = async (index: number) => {
		setLoading(true);
		try {
			await axios.delete(
				`http://localhost:4242/api/rendezvous/${appointments[index].id}`,
			);
			setAppointments((prev) => prev.filter((_, i) => i !== index));
			toast.info("Rendez-vous supprimé.");
		} catch (error) {
			console.error(error);
			toast.error("Erreur lors de la suppression du rendez-vous.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rendezvous-section">
			{isModalOpen && (
				<div className="rendezvous-content">
					<h1>Gérer vos rendez-vous</h1>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="cta-button" onClick={onBack}>
						Retour
					</button>

					<form onSubmit={handleSubmit}>
						<input
							type="datetime-local"
							name="date_heure"
							value={form.date_heure || ""} // Garantir que la valeur est une chaîne vide si undefined
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="motif"
							value={form.motif || ""} // Garantir que la valeur est une chaîne vide si undefined
							onChange={handleChange}
							placeholder="Motif du rendez-vous"
							required
						/>
						<input
							type="text"
							name="description"
							value={form.description || ""} // Garantir que la valeur est une chaîne vide si undefined
							onChange={handleChange}
							placeholder="Description"
							required
						/>
						<button type="submit" disabled={loading}>
							{editIndex !== null ? "Modifier" : "Ajouter"}
						</button>
					</form>
					<ul>
						<AnimatePresence>
							{appointments.map((appointment, index) => (
								<motion.li
									key={appointment.id}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{ duration: 0.3 }}
								>
									{new Date(appointment.date_heure).toLocaleString()} -{" "}
									{appointment.motif} : {appointment.description}
									{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
									<button onClick={() => handleEdit(index)}>Modifier</button>
									{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
									<button onClick={() => handleDelete(index)}>Supprimer</button>
								</motion.li>
							))}
						</AnimatePresence>
					</ul>
				</div>
			)}

			<ToastContainer position="top-center" autoClose={1500} />
		</div>
	);
}

export default RendezVous;
