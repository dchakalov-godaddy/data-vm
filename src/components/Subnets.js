import data from "../data/all_subnets.json";
import Table from "./Table.js";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

export default function MainSection() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[0])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	const handleChange = (event, newValue) => {
		setKey(newValue)
	}
	let dates = []
	for (const item of data) {
		dates.push(Object.keys(item)[0]);
	}

	
	return (
		<body className="main-section">
			<h2>SUBNETS</h2>
			<Tabs
				className="mb-3"
				defaultActiveKey={initialKey}
				id="subnets-tabs"
				activeKey={key}
				onSelect={(k) => {
					setKey(k);
				}}
			>
				{data.map((date) => (
					<Tab eventKey={Object.keys(date)[0]} title={Object.keys(date)[0]}>
						{(Object.values(date)[0]).map((env, index) => (
							 <Table key={index} data={env} />
						))}
					</Tab>
				))}
			</Tabs>
			{/* {data.map((env, index) => {
				
				return <Table key={index} data={env} />;
			})} */}
		</body>
	);
}
