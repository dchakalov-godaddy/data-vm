import { Nav } from "react-bootstrap";

export default function Navigation() {

	return (
		<Nav fill variant="tabs">
			<Nav.Item>
				<Nav.Link eventKey="subnets" href="/#/subnets">
					Subnets
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="combined-subnets" href="/#/combined-subnets">
					Combined Subnets
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="vmpersub" href="/#/vmpersub">
					VMs Per Subnet
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="zones" href="/#/zones">
					Availability Zones
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="projects" href="/#/projects">
					Projects
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="empty-projects" href="/#/empty-projects">
					Empty Projects
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="project-validation" href="/#/project-validation">
					Project Validation
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="risky" href="/#/risky">
					Risky Hypervisors
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="multifips" href="/#/multifips">
					VMs with multiple FIPs
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
			<Nav.Item>
				<Nav.Link eventKey="sentinelone" href="/#/sentinelone">
					SentinelOne
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
