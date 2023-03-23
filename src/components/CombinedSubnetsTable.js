import { CSVLink } from "react-csv";

export default function CombinedSubnetsTable({ data, type }) {
	let date = Object.keys(data)[0];

	let cloudData = data[date];

	let theadData = [];

	let fullData = [];

	for (const cloud of cloudData) {
		let cloudName = Object.keys(cloud)[0];
		let subnets = Object.values(cloud[cloudName]);

		for (const subnet of subnets) {
			subnet.cloud = cloudName;
			
			function networkZoneConverter(zone) {
				if (zone.includes("lbaas")) {
					return zone.split('-')[3]
				} else {
					return zone.split("_")[0].substring(2)
				}
			}

			fullData.push({
				subnet: subnet.subnet,
				...(subnet.name && { name: subnet.name }),
				id: subnet.subnet_id,
				...(subnet["network_zone"] && { network_zone: networkZoneConverter(subnet.network_zone) }),
				usage: subnet.total_usage,
				count: subnet.count,
				"migrated": subnet["migrated"],
				'do_not_migrate': subnet['do_not_migrate'],
				to_be_migrated: subnet.to_be_migrated,
				cloud: subnet.cloud,
			});
		}
	}

	for (const key in fullData[0]) {
		theadData.push(key);
	}

	if (fullData[0].name === undefined) {
		theadData = theadData.filter((word) => word !== "name");
	}
	if (fullData[0]['network-zone'] === undefined) {
		theadData = theadData.filter((word) => word !== "network-zone");
	}
	if (fullData[0]["migrated-b"] === undefined) {
		theadData = theadData.filter((word) => word !== "migrated-b");
	}
	if (fullData[0]["to_be_migrated"] === undefined) {
		theadData = theadData.filter((word) => word !== "to_be_migrated");
	}

	return (
		<div className="table-section">
			<div className="table-div">
				<button variant="contained" color="primary" className="export-btn">
					<CSVLink
						data={fullData}
						filename={`full-subnet-list`}
						style={{ textDecoration: "none", color: "#fff" }}
					>
						<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
					</CSVLink>
				</button>

				<table className="data-table">
					<thead>
						<tr className="table-heading">
							{theadData.map((heading, index) => {
								return <th key={index}>{heading}</th>;
							})}
						</tr>
					</thead>
					<tbody className="table-body">
						{fullData.map((vm, idx) => {
							return (
								<tr className="table-row" key={idx}>
									{theadData.map((key, index) => {
										return <td key={index}>{vm[key]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
