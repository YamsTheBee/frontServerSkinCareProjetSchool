// import { BrowserRouter as Router } from "react-router-dom";
import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/navBar";
// import WelcomeSection from "./components/welcome";

function App() {
	return (
		// <Router>
		<div className="App">
			<NavBar />

			<main>
				<Outlet />
			</main>
		</div>
		// {/* </Router> */}
	);
}

export default App;
