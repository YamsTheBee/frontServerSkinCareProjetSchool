import Footer from "../components/footer";
import WelcomeSection from "../components/welcome";
import "./Home.css";
function Home() {
	return (
		<div className="HomeContent">
			<div className="HomeSection">
				<WelcomeSection />
				<Footer />
			</div>
		</div>
	);
}

export default Home;
