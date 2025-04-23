import { useState } from "react";
import MonCompteModal from "../components/monCompteModal";

const MonCompte = () => {
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="page">
			<h1 className="text-xl font-bold mb-4">Mon compte</h1>

			{/* Modal affiché si isModalOpen est true */}
			<MonCompteModal isOpen={isModalOpen} onClose={handleCloseModal} />

			{/* Bouton pour réouvrir le modal */}
			<button
				type="button"
				onClick={() => setIsModalOpen(true)}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
			>
				Ouvrir les infos du compte
			</button>
		</div>
	);
};

export default MonCompte;
