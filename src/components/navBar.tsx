import type React from "react";
import { useState } from "react";
import MonCompteModal from "./monCompteModal";
import SkinCareLogo from "../assets/LogokinCare.png";
import "./navBar.css"; // Assurez-vous que ce fichier est bien importé
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<nav className="nav-container">
				<div>
					<a href="/Home" target="_blank" rel="noreferrer">
						<img src={SkinCareLogo} className="logo" alt="Vite logo" />
					</a>
				</div>
				<ul className="header-ulNav">
					<li>
						<Link to="/">Accueil</Link>
					</li>
					<li>
						<Link to="/productPage">Produits</Link>
					</li>
					<li>
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#" onClick={openModal}>
							Mon Compte
						</a>
					</li>
				</ul>
			</nav>
			<MonCompteModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default NavBar;
