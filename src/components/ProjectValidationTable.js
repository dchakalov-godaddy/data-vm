import { useState } from "react";
import { CSVLink } from "react-csv";

export default function ProjectValidationTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["name", "id", "owning_group", "set_dst_project"];

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{cloudData.length > 0 ? (
				<button variant="contained" color="primary" className="export-btn">
					<CSVLink
						data={cloudData}
						filename={`${cloudName}-${type}`}
						style={{ textDecoration: "none", color: "#fff" }}
					>
						<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
					</CSVLink>
				</button>
			) : (
				""
			)}

			{cloudData.length > 0 ? (
				<div className="table-div">
					<table className="data-table">
						<thead>
							<tr className="table-heading">
								{theadData.map((heading, index) => {
									return <th key={index}>{heading}</th>;
								})}
							</tr>
						</thead>
						<tbody className="table-body">
							{Array.from(Object.values(cloudData)).map((vm, idx) => {
								return (
									<tr className="table-row" key={idx}>
										{theadData.map((key, index) => {
											return typeof vm[key] == "object" ? (
												<td key={index}>{vm[key].join(", ")}</td>
											) : (
												<td key={index}>{vm[key] || "No data"}</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<div className="no-multifips">No projects with invalid destination project IDs</div>
			)}
		</div>
	);
}
