import data from "../data/all_subnets.json";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CombinedSubnetsTable from "./CombinedSubnetsTable.js";

export default function CombinedSubnets() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[data.length - 1])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	return (
		<div className="main-section">
			<h2 className="page-heading">COMBINED SUBNETS</h2>
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
						<CombinedSubnetsTable key={idx} data={date} type="combined-subnets" />
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
