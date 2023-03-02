import { CSVLink } from "react-csv";

export default function SentinelOneTable({ data, type }) {
	let date = Object.keys(data)[0];

	let cloudData = data[date];

	let theadData = ["Cloud", "Services"];

	let fullData = [];

	for (const cloud of cloudData) {
		let cloudName = Object.keys(cloud)[0];
		let cloudObj = { [cloudName]: [] };
		let services = Object.values(cloud[cloudName]);
		for (const service of services) {
			let [usage, name] = service.split(" ");
			cloudObj[cloudName].push({ [name]: Number(usage) });
		}
		fullData.push(cloudObj);
	}

	function totalUsage(list) {
		let total = 0;
		for (const service of list) {
			total += Object.values(service)[0];
		}
		return total;
	}

	let result = fullData
		.sort((a, b) => totalUsage(Object.values(b)[0]) - totalUsage(Object.values(a)[0]))
		.slice(0, 100);
	
	console.log(JSON.stringify(Object.values(result[0])[0]));

	return (
		<div className="table-section">
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
						{result.map((cloud, idx) => {
							return (
								<tr className="table-row" key={idx}>
									<td>{Object.keys(cloud)}</td><td>{ JSON.stringify(Object.values(cloud)[0])}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
