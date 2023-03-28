import { useState } from "react";
import { CSVLink } from "react-csv";

export default function ZonesTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["zone", "count", "migrated", "do_not_migrate", "to_be_migrated"];
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
				subnet.zones !== undefined ? (
					<div className="table-div" key={index}>
						<button variant="contained" color="primary" className="export-btn">
							<CSVLink
								data={subnet.zones}
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
									{Array.from(Object.values(subnet.zones)).map((vm, idx) => {
										return (
											<tr className="table-row" key={idx}>
												{theadData.map((key, index) => {
													return <td key={index}>{vm[key]}</td>
	
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
