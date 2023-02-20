import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import data from "../data/all-projects.json";
import ProjectTable from "./ProjectTable.js";
import SubnetTable from "./SubnetTable.js";
import Table from "./Table.js";

export default function Projects() {
    const [key, setKey] = useState();

	let initialKey = Object.keys(data[0])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	let dates = [];
	for (const item of data) {
		dates.push(Object.keys(item)[0]);
    }
    
    return (
		<div className="main-section">
			<h2 className="page-heading">PROJECTS</h2>
			<Tabs
				className="mb-3"
				defaultActiveKey={initialKey}
				id="subnets-tabs"
				activeKey={key}
				onSelect={(k) => {
					setKey(k);
				}}
			>
				{data.map((date, idx) => (
					<Tab key={idx} eventKey={Object.keys(date)[0]} title={Object.keys(date)[0]}>
						{Object.values(date)[0].map((env, index) => (
							<ProjectTable key={index} data={env} type="projects" />
						))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
