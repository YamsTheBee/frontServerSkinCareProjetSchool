import { useState } from "react";
import RendezVous from "../components/RDV/RendezVous";
import "./Welcome.css";

function Welcome() {
	const [showRendezVous, setShowRendezVous] = useState(false);

	const handleTakeAppointment = () => {
		setShowRendezVous(true);
	};

	const handleBack = () => {
		setShowRendezVous(false);
	};

	return (
		<div className="welcome-section">
			<div className="welcome-content">
				<h1>Transform your skin</h1>
				<p>Découvrez nos solutions pour une peau en bonne santé.</p>
				{!showRendezVous && (
					<button
						type="button"
						className="cta-button"
						onClick={handleTakeAppointment}
					>
						Prendre un rdv
					</button>
				)}
				{showRendezVous && <RendezVous onBack={handleBack} />}
			</div>
		</div>
	);
}

export default Welcome;
