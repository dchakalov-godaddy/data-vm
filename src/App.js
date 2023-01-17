import "./App.css";
import Header from "./components/Headers.js";
import Subnets from "./components/Subnets.js";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import Risky from "./components/Risky.js";

function App() {
	return (
		<>
			<Header />
			<Navigation />
			<main>
				<Routes>
					<Route path="/subnets" element={<Subnets />} />
					<Route path="/risky" element={<Risky />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
