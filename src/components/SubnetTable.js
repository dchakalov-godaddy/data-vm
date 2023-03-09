import { useState } from "react";
import { CSVLink } from "react-csv";

export default function SubnetTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["id", "hypervisor", "usage", "owning_group", "created_by"];
	let subnetNames = [];

	let subnetShowObj = {};
	for (const subnet of cloudData) {
		subnetShowObj[subnet.subnet] = false;
	}

	const [isShown, setIsShown] = useState({ ...subnetShowObj });

	for (const key in Object.values(cloudData)) {
		try {
			let currentObject = Object.values(cloudData)[key];
			subnetNames.push(currentObject.subnet);
		} catch (error) {
			console.log(error);
		}
	}

	const clickHandler = (subnet) => {
		setIsShown((state) => ({
			...state,
			[subnet]: !state[subnet],
		}));
	};

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{cloudData.map((subnet, index) =>
				subnet.vms_list !== undefined ? (
					<div className="table-div" key={index}>
						<button variant="contained" color="primary" className="export-btn">
							<CSVLink
								data={subnet.vms_list}
								filename={`${cloudName}-${type}`}
								style={{ textDecoration: "none", color: "#fff" }}
							>
								<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
							</CSVLink>
						</button>

						<h5 className="table-header">{subnet.subnet}</h5>
						<button className="show-table-button" onClick={() => clickHandler(subnet.subnet)}>
							{isShown[subnet.subnet] ? "Hide table" : "Show table"}
						</button>
						{isShown[subnet.subnet] && (
							<table className="data-table" key={index}>
								
								<thead>
									<tr className="table-heading">
										{theadData.map((heading, index) => {
											return <th key={index}>{heading}</th>;
										})}
									</tr>
								</thead>
								<tbody className="table-body">
									{Array.from(Object.values(subnet.vms_list)).map((vm, idx) => {
										return (
											<tr className="table-row" key={idx}>
												{theadData.map((key, index) => {
													return vm.metadata !== undefined ? (
														<td key={index}>{vm[key] || vm.metadata[key] || "No data"}</td>
													) : (
														<td key={index}>{vm[key] || "No data"}</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				) : (
					""
				)
			)}
		</div>
	);
}
