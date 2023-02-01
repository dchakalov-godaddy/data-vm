import { useState } from "react";
import { CSVLink } from "react-csv";

export default function SubnetTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["id", "hipervisor", "usage"];
	let subnetNames = [];

	let subnetShowObj = {};
	for (const subnet of cloudData) {
		subnetShowObj[subnet.subnet] = false;
	}

	const [isShown, setIsShown] = useState({ ...subnetShowObj });
	const [showMeta, setShowMeta] = useState(false);

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

	const rowClickHandler = (vm) => {
		setShowMeta((current) => !current);
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

						<h5 className="subnet-heading">{subnet.subnet}</h5>
						<button className="show-table-button" onClick={() => clickHandler(subnet.subnet)}>
							{isShown[subnet.subnet] ? "Hide table" : "Show table"}
						</button>
						{isShown[subnet.subnet] && (
							<table className="data-table" key={index}>
								<thead>
									<tr className="table-heading">
										{theadData.map((heading) => {
											return <th key={heading}>{heading}</th>;
										})}
									</tr>
								</thead>
								<tbody className="table-body">
									{Array.from(Object.values(subnet.vms_list)).map((vm, idx) => {
										return (
											<>
												<tr className="table-row" key={idx} onClick={() => rowClickHandler(vm)}>
													{theadData.map((key, index) => {
														return <td key={index}>{vm[key]}</td>;
													})}
												</tr>
												{showMeta && (
													<tr>
														{vm.metadata.owning_group
															? `Owning group: ${vm.metadata.owning_group}, Business service id: ${vm.metadata.business_service_id}`
															: "No owning group present"}
													</tr>
												)}
											</>
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
