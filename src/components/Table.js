import { useState } from "react";
import { CSVLink } from "react-csv";

export default function Table({ data, type }) {
	let cloudName = Object.keys(data)[0];
	const [isShown, setIsShown] = useState(false);

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
			try {
				let currentObject = Object.values(cloudData)[key];
				let hvName = Object.keys(currentObject)[0];
				hvNames.push(hvName);
				theadData = Object.keys(currentObject[hvName][0]);
				for (const header of theadData) {
					headers.push({ label: header, key: header });
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const clickHandler = () => {
		setIsShown(current => !current)
	};

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{typeof Object.values(cloudData[0])[0] == "string" && cloudData !== "No high risk hypervisors" ? (
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
					<div key={idx} className="table-div">
						<h5>{hvName}</h5>
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
				<div className="table-section">
					<button className="show-table-button" onClick={clickHandler}>
						{isShown ? "Hide table" : "Show table"}
					</button>
					{isShown && (
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
					)}
				</div>
			)}
		</div>
	);
}
