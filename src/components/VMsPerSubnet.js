import { useEffect } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import data from '../data/vm_per_subnet.json'
import SubnetTable from './SubnetTable.js';

export default function VMsPerSubnet() {
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
			<h2 className="page-heading">VMs PER SUBNET</h2>
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
							<SubnetTable key={index} data={env} />
						))}
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
