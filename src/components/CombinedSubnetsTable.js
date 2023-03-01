import { useState } from "react";
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
			fullData.push(subnet);
		}
	}

	for (const key in fullData[0]) {
		theadData.push(key);
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
