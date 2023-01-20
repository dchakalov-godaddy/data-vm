import { CSVLink } from "react-csv";

export default function Table({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = [];
	let hvNames = [];
	let headers = [];
	if (typeof Object.values(cloudData[0])[0] == "string") {
		theadData = Object.keys(cloudData[0]);
		for (const header of theadData) {
			headers.push({ label: header, key: header });
		}
	} else {
		for (const key in Object.values(cloudData)) {
			let currentObject = Object.values(cloudData)[key];
			let hvName = Object.keys(currentObject)[0];
			hvNames.push(hvName);
			theadData = Object.keys(currentObject[hvName][0]);
			for (const header of theadData) {
				headers.push({ label: header, key: header });
			}
		}
	}

	function getHypervisorData(cloudData, hvName) {
		function traverse_it(obj) {
			for (var prop in obj) {
				if (typeof obj[prop] == "object") {
					// object
					if (obj[prop].hasOwnProperty(hvName)) {
						return Object.values(obj[prop]);
					}
					traverse_it(obj[prop]);
				} else {
					// let key = Object.keys(obj[prop])[0];
					// if (key == hvName) {
					// 	let test = Object.entries(obj[prop])
					// 	console.log(Object.entries(test)[0][1][1]);
					// }
				}
			}
		}

		traverse_it(cloudData);
	}

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{typeof Object.values(cloudData[0])[0] == "string" ? (
				<button variant="contained" color="primary" className="export-btn">
					<CSVLink
						data={Object.values(cloudData)}
						filename={`${cloudName}-${type}`}
						style={{ textDecoration: "none", color: "#fff" }}
					>
						<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
					</CSVLink>
				</button>
			) : (
				""
			)}

			{typeof Object.values(cloudData[0])[0] == "object" ? (
				hvNames.map((hvName, idx) => (
					<div key={idx}>
						<h5>{hvName}</h5>
						{/* <button variant="contained" color="primary" className="export-btn">
							<CSVLink
								data={getHypervisorData(cloudData, hvName)}
								filename={`${cloudName}-${type}`}
								style={{ textDecoration: "none", color: "#fff" }}
							>
								<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
							</CSVLink>
						</button> */}
						{getHypervisorData(cloudData, hvName)}
						<table className="data-table">
							<thead>
								<tr className="table-heading">
									{theadData.map((heading, index) => {
										return <th key={index}>{heading}</th>;
									})}
								</tr>
							</thead>
							<tbody className="table-body">
								{typeof cloudData == "string" ? (
									<h3>No risky hypervisors</h3>
								) : (
									Array.from(Object.values(cloudData)).map((data, index) => {
										return Object.entries(data).map((entry) =>
											entry[0] === hvName
												? entry[1].map((vm, idx) => (
														<tr className="table-row" key={idx}>
															{theadData.map((key, index) => {
																return <td key={index}>{vm[key]}</td>;
															})}
														</tr>
												  ))
												: ""
										);
									})
								)}
							</tbody>
						</table>
					</div>
				))
			) : (
				<div>
					<table className="data-table">
						<thead>
							<tr className="table-heading">
								{theadData.map((heading) => {
									return <th key={heading}>{heading}</th>;
								})}
							</tr>
						</thead>
						<tbody className="table-body">
							{typeof cloudData == "string" ? (
								<h3>No risky hypervisors</h3>
							) : (
								cloudData.map((row, index) => {
									return (
										<tr className="table-row" key={index}>
											{theadData.map((key, index) => {
												return <td key={index}>{row[key]}</td>;
											})}
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

// let hv = Object.keys(row)[0];
// let hv_data = row[hv];
// hv_data.map((vm_data) => {
// 	return (
// 		<tr className="table-row" key={index}>
// 			{theadData.map((key, ind) => {
// 				console.log(vm_data[key]);
// 				return <td key={ind}>{vm_data[key]}</td>;
// 			})}
// 		</tr>
// 	);
// });
