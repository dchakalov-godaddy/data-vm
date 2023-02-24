import { useEffect, useState } from "react";
import data from '../data/all-multifips.json'
import { Tab, Tabs } from "react-bootstrap";
import MultifipsTable from "./MultifipsTable.js";


export default function Multifips() {
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
			<h2 className="page-heading">VMs with multiple FIPs</h2>
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
							<MultifipsTable key={index} data={env} type="multifips" />
						))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
