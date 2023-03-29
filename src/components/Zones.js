import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import data from "../data/all-zones.json";
import ZonesTable from "./ZonesTable.js";

export default function Zones() {
    const [key, setKey] = useState();

	let initialKey = Object.keys(data[data.length - 1])[0];
	useEffect(() => {
		setKey(initialKey);
    }, []);
    
    return (
		<div className="main-section">
			<h2 className="page-heading">COUNT PER AVAILABILITY ZONE</h2>
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
							<ZonesTable key={index} data={env} />
						))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
