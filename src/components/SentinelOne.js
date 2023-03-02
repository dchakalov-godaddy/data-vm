import data from "../data/sentinel-data.json";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SentinelOneTable from "./SentinelOneTable.js";

export default function SentinelOne() {
	const [key, setKey] = useState();

	let initialKey = Object.keys(data[0])[0];
	useEffect(() => {
		setKey(initialKey);
	}, []);

    return (
		<div className="main-section">
			<h2 className="page-heading">SentinelOne</h2>
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
						<SentinelOneTable key={idx} data={date} type="sentinel-one" />
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
