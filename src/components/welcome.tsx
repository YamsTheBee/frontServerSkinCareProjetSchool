import "./Welcome.css";

function WelcomeSection() {
	const handleSuccess = () => {
		console.log("Rendez-vous pris avec succès!");
	};

	return (
		<div className="welcome-section">
			<div className="welcome-content">
				<h1>Transform your skin </h1>
				<p>Découvrez nos solutions pour une peau en bonne santé.</p>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button className="cta-button" onClick={handleSuccess}>
					Prendre un rdv
				</button>
			</div>
		</div>
	);
}

export default WelcomeSection;
