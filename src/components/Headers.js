import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate()

	const headerClickHandler = () => {
		navigate('/')
	}

	return (
		<header onClick={headerClickHandler} className="header">
			<div className="header-heading">Legacy Openstack data representation</div>
		</header>
	);
}
