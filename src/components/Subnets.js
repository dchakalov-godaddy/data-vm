import data from "../data/all_subnets.json";
import Table from "./Table.js";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

export default function MainSection() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[data.length - 1])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	// let dates = []
	// for (const item of data) {
	// 	dates.push(Object.keys(item)[0]);
	// }
	
	

	return (
		<div className="main-section">
			<h2 className="page-heading">SUBNETS</h2>
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
							<Table key={index} data={env} type="subnets" />
						))}
					</Tab>
				))}
			</Tabs>			
		</div>
	);
}
