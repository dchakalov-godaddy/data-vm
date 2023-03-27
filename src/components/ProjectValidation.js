import data from "../data/all-project-validate.json";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Table from "./Table.js";
import MultifipsTable from "./MultifipsTable.js";
import ProjectValidationTable from "./ProjectValidationTable.js";

export default function ProjectValidation() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[data.length - 1])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	let dates = [];
	for (const item of data) {
		dates.push(Object.keys(item)[0]);
	}

	return (
		<div className="main-section">
			<h2 className="page-heading">PROJECT VALIDATION</h2>
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
							<ProjectValidationTable key={index} data={env} type="subnets" />
						))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
