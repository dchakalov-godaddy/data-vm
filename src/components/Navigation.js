import { Nav, NavLink } from "react-bootstrap";

export default function Navigation() {
	const activeNavStyle = {
		borderBottom: "3px solid rgb(172, 213, 142)",
		color: "rgb(172,213,142)",
	};

	const defaultNavStyle = {
		borderBottom: "",
		color: "",
	};

	return (
		<Nav fill variant="tabs">
			<Nav.Item>
				<Nav.Link eventKey="subnets" href="/#/subnets">
					Subnets
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="vmpersub" href="/#/vmpersub">
					VMs Per Subnet
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="risky" href="/#/risky">
					Risky Hypervisors
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="hypervisors" href="/#/hypervisors">
					Hypervisors
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="vmperhv" href="/#/vmperhv">
					VM per HV disk usage
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
