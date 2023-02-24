import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Headers.js";
import Navigation from "./components/Navigation.js";
import Loader from "./components/Loader.js";
import Multifips from "./components/Multifips.js";
// import Home from "./components/Home.js";
// import Subnets from "./components/Subnets.js";
// import Risky from "./components/Risky.js";
// import Hypervisors from "./components/Hypervisors.js";
// import VMsPerHV from "./components/VMsPerHV.js";
// import VMsPerSubnet from "./components/VMsPerSubnet.js";
// import Projects from "./components/Projects.js";
const Projects = lazy(() => import("./components/Projects.js"));
const Subnets = lazy(() => import("./components/Subnets.js"));
const Risky = lazy(() => import("./components/Risky.js"));
const Hypervisors = lazy(() => import("./components/Hypervisors.js"));
const VMsPerHV = lazy(() => import("./components/VMsPerHV.js"));
const VMsPerSubnet = lazy(() => import("./components/VMsPerSubnet.js"));
const Home = lazy(() => import("./components/Home.js"));

function App() {
	return (
		<>
			<Header />
			<Navigation />
			<main>
				<Suspense fallback={<Loader/>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/subnets" element={<Subnets />} />
						<Route path="/vmpersub" element={<VMsPerSubnet />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/risky" element={<Risky />} />
						<Route path="/multifips" element={<Multifips />} />
						<Route path="/hypervisors" element={<Hypervisors />} />
						<Route path="/vmperhv" element={<VMsPerHV />} />
					</Routes>
				</Suspense>
			</main>
		</>
	);
}

export default App;
