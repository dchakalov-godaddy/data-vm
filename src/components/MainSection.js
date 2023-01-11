
export default async function MainSection() {

	let file = await fetch("http://dc-data-vm.cloud.phx3.gdg/data/ams_private_subnets-json");

	let jsonRes = await file.json()

	console.log(jsonRes);

	return (
		<body className="main-section">
            <h2>This is the main section</h2>
		</body>
	);
}
