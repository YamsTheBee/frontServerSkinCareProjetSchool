// import "./footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* Contact */}
				<div>
					<h3 className="font-semibold uppercase text-sm mb-3">
						Contactez-nous
					</h3>

					<p>
						<strong>Email :</strong>{" "}
						<a href="mailto:contact@lesliemontecarlo.com" className="underline">
							contact@skincare.wcs
						</a>
					</p>
					<p>
						<strong>Tel :</strong> +377 90 00 10 00
					</p>
				</div>

				{/* Liens utiles */}
				<div>
					<h3 className="font-semibold uppercase text-sm mb-3">Liens utiles</h3>
					<ul className="space-y-2">
						<li>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
						<li>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a href="#" className="hover:underline">
								Recherche
							</a>
						</li>
					</ul>
				</div>

				{/* Réseaux sociaux */}
				<div>
					<h3 className="font-semibold uppercase text-sm mb-3">Suivez-nous</h3>
					<ul className="space-y-2">
						<li>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a href="#" className="hover:underline">
								Facebook
							</a>
						</li>
						<li>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a href="#" className="hover:underline">
								Instagram
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
