// import { useState } from "react";
// import UserForm from "./userForm"; // Assurez-vous que le chemin est correct

import "./Welcome.css";

function Welcome() {
	return (
		<div className="welcome-section">
			<div className="welcome-content">
				<h1>Transform your skin</h1>
				<p>Découvrez nos solutions pour une peau en bonne santé.</p>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button className="cta-button">Prendre un rdv</button>
			</div>
		</div>
	);
}

export default Welcome;
