export default function Table({ data }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = Object.keys(cloudData[0]);

	return (
		<>
			<h2 className="table-h2">{cloudName}</h2>
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
										return <td key={row[key]}>{row[key]}</td>;
									})}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</>
	);
}
