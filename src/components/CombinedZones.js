import data from "../data/combined-zones.json";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CombinedSubnetsTable from "./CombinedSubnetsTable.js";
import CombinedZonesTable from "./CombinedZonesTable.js";

export default function CombinedZones() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[data.length - 1])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

	return (
		<div className="main-section">
			<h2 className="page-heading">COMBINED AV ZONES</h2>
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
						<CombinedZonesTable key={idx} data={date} type="combined-subnets" />
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
