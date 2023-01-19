export default function Table({ data }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = [];
	let hvNames = [];
	if (typeof Object.values(cloudData[0])[0] == "string") {
		theadData = Object.keys(cloudData[0]);
	} else {
		// hv_name = Object.keys(cloudData[0])[0]
		// console.log(Object.keys(Object.values(cloudData)));
		for (const key in Object.values(cloudData)) {
			let currentObject = Object.values(cloudData)[key];
			let hvName = Object.keys(currentObject)[0];
			hvNames.push(hvName);
			theadData = Object.keys(currentObject[hvName][0]);
		}
	}
	// let listItems = Object.keys(cloudData).map((propKey) => (
	// 	<ul key={propKey}>
	// 		{propKey}
	// 		{data[propKey].map((childPropKey) => (
	// 			<li key={childPropKey}>{childPropKey}</li>
	// 		))}
	// 	</ul>
	// ));

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{typeof Object.values(cloudData[0])[0] == "object" ? (
				hvNames.map((hvName, idx) => (
					<div key={idx}>
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
