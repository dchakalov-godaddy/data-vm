import { useState } from "react";
import { CSVLink } from "react-csv";

export default function ProjectTable({ data, type }) {
	let cloudName = Object.keys(data)[0];

	let cloudData = data[cloudName];

	let theadData = ["name", "id", "hypervisor"];

    let projectShowObj = {};
    for (const project of cloudData) {
        projectShowObj[project.project] = false;
    }
    
    const [isShown, setIsShown] = useState({ ...projectShowObj });


	const clickHandler = (project) => {
		setIsShown((state) => ({
			...state,
			[project]: !state[project],
		}));
	};

	return (
		<div className="table-section">
			<h2 className="table-h2">{cloudName}</h2>
			{cloudData.map((project, index) =>
				project.vm_list !== undefined ? (
					<div className="table-div" key={index}>
						<button variant="contained" color="primary" className="export-btn">
							<CSVLink
								data={project.vm_list}
								filename={`${cloudName}-${type}`}
								style={{ textDecoration: "none", color: "#fff" }}
							>
								<img className="excel-button-logo" src="/excel-logo.png" alt=""></img>
							</CSVLink>
						</button>

						<h5 className="table-header">
							{project.project} - {project.vm_list.length} vms
						</h5>
						<button className="show-table-button" onClick={() => clickHandler(project.project)}>
							{isShown[project.project] ? "Hide table" : "Show table"}
						</button>
						{isShown[project.project] && (
							<table className="data-table" key={index}>
								<thead>
									<tr className="table-heading">
										{theadData.map((heading, index) => {
											return <th key={index}>{heading}</th>;
										})}
									</tr>
								</thead>
								<tbody className="table-body">
									{Array.from(Object.values(project.vm_list)).map((vm, idx) => {
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
