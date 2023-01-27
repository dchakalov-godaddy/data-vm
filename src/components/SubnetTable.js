import { CSVLink } from "react-csv";

export default function SubnetTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["id", "hipervisor", "usage"];
	let subnetNames = [];

	for (const key in Object.values(cloudData)) {
		try {
			let currentObject = Object.values(cloudData)[key];
			subnetNames.push(currentObject.subnet);
		} catch (error) {
			console.log(error);
		}
	}

	console.log(cloudData.length);

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{cloudData.map((subnet, idx) => (
				<div className="table-div">
					<button variant="contained" color="primary" className="export-btn">
						<CSVLink
							data={subnet.vms_list}
							filename={`${cloudName}-${type}`}
							style={{ textDecoration: "none", color: "#fff" }}
						>
							<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
						</CSVLink>
					</button>
					<h5 className="subnet-heading">{subnet.subnet}</h5>
					<table className="data-table" key={idx}>
						<thead>
							<tr className="table-heading">
								{theadData.map((heading) => {
									return <th key={heading}>{heading}</th>;
								})}
							</tr>
						</thead>
						<tbody className="table-body">
							{Array.from(Object.values(subnet.vms_list)).map((vm, index) => {
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
			))}
		</div>
	);
}
