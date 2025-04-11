import viteLogo from "/vite.svg";

function NavBar() {
	return (
		<nav className="nav-container">
			<div>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<ul className="header-ulNav">
				<li className="header-active" />
				<li>Nos produits</li>
				<li>Contact</li>
				<li>Rendez-Vous</li>
				<li>Mon compte</li>
			</ul>
		</nav>
	);
}
export default NavBar;
