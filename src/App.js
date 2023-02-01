import "./App.css";
import Header from "./components/Headers.js";
import Subnets from "./components/Subnets.js";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import Risky from "./components/Risky.js";
import Hypervisors from "./components/Hypervisors.js";
import VMsPerHV from "./components/VMsPerHV.js";
import VMsPerSubnet from "./components/VMsPerSubnet.js";
import Home from "./components/Home.js";

function App() {
	return (
		<>
			<Header />
			<Navigation />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/subnets" element={<Subnets />} />
					<Route path="/vmpersub" element={<VMsPerSubnet />} />
					<Route path="/risky" element={<Risky />} />
					<Route path="/hypervisors" element={<Hypervisors />} />
					<Route path="/vmperhv" element={<VMsPerHV />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
