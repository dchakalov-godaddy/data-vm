import data from '../data/data.json'
import Table from './Table.js';

export default function MainSection() {

	return (
		<body className="main-section">
			{data.map((env, index) => {
				
				return <Table key={index} data={env} />;
			})}
			
		</body>
	);
}
